using System.Collections.Generic;
using Microsoft.Data.Entity.Relational.Migrations;
using Microsoft.Data.Entity.Relational.Migrations.Builders;
using Microsoft.Data.Entity.Relational.Migrations.Operations;

namespace tsdemo.logic.Migrations
{
    public partial class first : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.CreateSequence(
                name: "DefaultSequence",
                type: "bigint",
                startWith: 1L,
                incrementBy: 10);
            migration.CreateTable(
                name: "Line",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false),
                    Name = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Line", x => x.id);
                });
            migration.CreateTable(
                name: "Product",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false),
                    Name = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.id);
                });
            migration.CreateTable(
                name: "Operation",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false),
                    LineId = table.Column(type: "int", nullable: false),
                    Name = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operation", x => x.id);
                    table.ForeignKey(
                        name: "FK_Operation_Line_LineId",
                        columns: x => x.LineId,
                        referencedTable: "Line",
                        referencedColumn: "id");
                });
            migration.CreateTable(
                name: "ProductLine",
                columns: table => new
                {
                    ProductId = table.Column(type: "int", nullable: false),
                    LineId = table.Column(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductLine", x => new { x.ProductId, x.LineId });
                    table.ForeignKey(
                        name: "FK_ProductLine_Line_LineId",
                        columns: x => x.LineId,
                        referencedTable: "Line",
                        referencedColumn: "id");
                    table.ForeignKey(
                        name: "FK_ProductLine_Product_ProductId",
                        columns: x => x.ProductId,
                        referencedTable: "Product",
                        referencedColumn: "id");
                });
            migration.CreateTable(
                name: "Status",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false),
                    Complete = table.Column(type: "bit", nullable: false),
                    Notes = table.Column(type: "nvarchar(max)", nullable: true),
                    OperationId = table.Column(type: "int", nullable: false),
                    ProductId = table.Column(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.id);
                    table.ForeignKey(
                        name: "FK_Status_Operation_OperationId",
                        columns: x => x.OperationId,
                        referencedTable: "Operation",
                        referencedColumn: "id");
                    table.ForeignKey(
                        name: "FK_Status_Product_ProductId",
                        columns: x => x.ProductId,
                        referencedTable: "Product",
                        referencedColumn: "id");
                });
        }
        
        public override void Down(MigrationBuilder migration)
        {
            migration.DropSequence("DefaultSequence");
            migration.DropTable("Line");
            migration.DropTable("Operation");
            migration.DropTable("Product");
            migration.DropTable("ProductLine");
            migration.DropTable("Status");
        }
    }
}
