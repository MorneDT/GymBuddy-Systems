using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PomegranateTechnologies.API.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CaptureDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<int>(nullable: true),
                    Weight = table.Column<long>(nullable: true)
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
                    CaptureDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
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
                name: "Workout",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CaptureDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    PersonId = table.Column<int>(nullable: false),
                    Time = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workout", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workout_Person_PersonId",
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
                    CaptureDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
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
                    CaptureDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
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

            migrationBuilder.CreateTable(
                name: "Exercise",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CaptureDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Reps = table.Column<long>(nullable: true),
                    Sets = table.Column<long>(nullable: true),
                    WorkoutId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exercise_Workout_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workout",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercise_WorkoutId",
                table: "Exercise",
                column: "WorkoutId");

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

            migrationBuilder.CreateIndex(
                name: "IX_Workout_PersonId",
                table: "Workout",
                column: "PersonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exercise");

            migrationBuilder.DropTable(
                name: "SystemUserAccount");

            migrationBuilder.DropTable(
                name: "SystemUserDetail");

            migrationBuilder.DropTable(
                name: "Workout");

            migrationBuilder.DropTable(
                name: "SystemUser");

            migrationBuilder.DropTable(
                name: "Person");
        }
    }
}
