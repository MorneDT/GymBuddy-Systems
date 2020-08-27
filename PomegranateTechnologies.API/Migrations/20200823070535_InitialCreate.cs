using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PomegranateTechnologies.API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CaptureDate = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SystemUser",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CaptureDate = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    Username = table.Column<string>(nullable: true),
                    PersonId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SystemUser_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SystemUserAccount",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CaptureDate = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    SystemUserId = table.Column<int>(nullable: false),
                    FailedLoginAttempts = table.Column<int>(nullable: false),
                    IsAccountLocked = table.Column<bool>(nullable: false),
                    AccountLockedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemUserAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SystemUserAccount_SystemUser_SystemUserId",
                        column: x => x.SystemUserId,
                        principalTable: "SystemUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SystemUserDetail",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CaptureDate = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    SystemUserId = table.Column<int>(nullable: false),
                    DetailHash = table.Column<byte[]>(nullable: true),
                    DetailSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemUserDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SystemUserDetail_SystemUser_SystemUserId",
                        column: x => x.SystemUserId,
                        principalTable: "SystemUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SystemUser_PersonId",
                table: "SystemUser",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_SystemUserAccount_SystemUserId",
                table: "SystemUserAccount",
                column: "SystemUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SystemUserDetail_SystemUserId",
                table: "SystemUserDetail",
                column: "SystemUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SystemUserAccount");

            migrationBuilder.DropTable(
                name: "SystemUserDetail");

            migrationBuilder.DropTable(
                name: "SystemUser");

            migrationBuilder.DropTable(
                name: "Person");
        }
    }
}
