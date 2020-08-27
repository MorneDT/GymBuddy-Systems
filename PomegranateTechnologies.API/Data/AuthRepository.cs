using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Linq;
using System;
using System.Threading.Tasks;
using PomegranateTechnologies.API.Models;
using Microsoft.EntityFrameworkCore;

namespace PomegranateTechnologies.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<SystemUser> Login(string username, string password)
        {
            var user = await _context.SystemUser
                            .Include(p => p.Person)
                            .Include(sua => sua.SystemUserAccounts)
                            .Include(sud => sud.SystemUserDetails)
                            .FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            if (user.SystemUserDetails != null)
            {
                SystemUserDetail sud = new SystemUserDetail();
                foreach (SystemUserAccount systemUserAccount in user.SystemUserAccounts)
                {
                    if (systemUserAccount.IsAccountLocked && systemUserAccount.AccountLockedDate < (DateTime.Now).AddMinutes(40)){
                        throw new Exception("The account is still locked, please try again later.");
                    }
                }

                foreach (SystemUserDetail systemUserDetail in user.SystemUserDetails)
                {
                    if (sud.CaptureDate == null || sud.CaptureDate < systemUserDetail.CaptureDate)
                    {
                        sud = systemUserDetail;
                    }
                }

                if (sud.Id == null && sud.CaptureDate == null)
                    return null;

                if (!VerifyPasswordHash(password, sud.DetailHash, sud.DetailSalt))
                {
                    bool lockAccount = false;
                    int failedAttemptsLeft = 3;
                    foreach (SystemUserAccount systemUserAccount in user.SystemUserAccounts)
                    {
                        systemUserAccount.FailedLoginAttempts++;
                        failedAttemptsLeft = 3 - systemUserAccount.FailedLoginAttempts;
                        if (systemUserAccount.FailedLoginAttempts >= 3)
                        {
                            systemUserAccount.FailedLoginAttempts = 0;
                            systemUserAccount.IsAccountLocked = true;
                            systemUserAccount.AccountLockedDate = DateTime.Now;
                            lockAccount = true;
                        }
                        _context.Update(systemUserAccount);
                    }
                    _context.SaveChanges();

                    if (failedAttemptsLeft <= 3)
                    {
                        throw new Exception($"You have {failedAttemptsLeft} attempts left.");
                    }
                    else if (lockAccount)
                    {
                        throw new Exception("The account is locked, try again later");
                    }

                    return null;
                }
                else
                {
                    foreach (SystemUserAccount systemUserAccount in user.SystemUserAccounts)
                    {
                        systemUserAccount.FailedLoginAttempts = 0;
                        systemUserAccount.IsAccountLocked = false;
                        systemUserAccount.AccountLockedDate = null;
                        _context.Update(systemUserAccount);
                    }
                    _context.SaveChanges();
                }

                return user;
            }

            return null;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<SystemUser> Register(SystemUser user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            SystemUserDetail sud = new SystemUserDetail()
            {
                DetailHash = passwordHash,
                DetailSalt = passwordSalt,
                CaptureDate = DateTime.Now,
                IsActive = true
            };

            SystemUserAccount sua = new SystemUserAccount()
            {
                CaptureDate = DateTime.Now,
                IsActive = true,
                IsAccountLocked = false,
                AccountLockedDate = null
            };

            user.IsActive = true;
            user.CaptureDate = DateTime.Now;
            user.Person.IsActive = true;
            user.Person.CaptureDate = DateTime.Now;
            user.SystemUserDetails = new Collection<SystemUserDetail>() {sud};
            user.SystemUserAccounts = new Collection<SystemUserAccount>() {sua};

            await _context.SystemUser.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.SystemUser.AnyAsync(x => x.Username == username))
                return true;

            return false;
        }
    }
}