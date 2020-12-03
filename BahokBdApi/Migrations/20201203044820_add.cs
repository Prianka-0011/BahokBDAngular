﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace BahokBdApi.Migrations
{
    public partial class add : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "PaymentTypes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "PaymentTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
