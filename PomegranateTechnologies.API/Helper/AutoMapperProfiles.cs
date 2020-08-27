using System.Linq;
using AutoMapper;
using PomegranateTechnologies.API.DTO;
using PomegranateTechnologies.API.Models;

namespace PomegranateTechnologies.API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDTO, Person>()
                .ForMember(dest => dest.FirstName, opt => {opt.MapFrom(src => src.Name); })
                .ForMember(dest => dest.LastName, opt => { opt.MapFrom(src => src.Surname); })
                .ForMember(dest => dest.Gender, opt => { opt.MapFrom(src => src.Gender); })
                .ForMember(dest => dest.DateOfBirth, opt => { opt.MapFrom(src => src.DateOfBirth); });

            CreateMap<UserForRegisterDTO, SystemUser>()
                .ForMember(dest => dest.Username, opt => { opt.MapFrom(src => src.EmailAddress); });

            CreateMap<Person, UserForDetailedDTO>()
                .ForMember(dest => dest.FullName, opt => { opt.MapFrom(src => $"{src.FirstName} {src.LastName}"); })
                .ForMember(dest => dest.Age, opt => { opt.MapFrom(d => d.DateOfBirth.CalculateAge()); });

            CreateMap<SystemUser, UserForDetailedDTO>()
                .ForMember(dest => dest.Username, opt => { opt.MapFrom(src => src.Username); })
                .ForMember(dest => dest.Id, opt => { opt.MapFrom(src => src.Id); })
                .ForMember(dest => dest.Created, opt => { opt.MapFrom(src => src.CaptureDate); });
        }
    }
}