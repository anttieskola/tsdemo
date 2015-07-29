using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Relational.Migrations.Infrastructure;
using tsdemo.logic.Dal;

namespace tsdemo.logic.Migrations
{
    [ContextType(typeof(AssemblyContext))]
    partial class first
    {
        public override string Id
        {
            get { return "20150729174302_first"; }
        }
        
        public override string ProductVersion
        {
            get { return "7.0.0-beta5-13549"; }
        }
        
        public override void BuildTargetModel(ModelBuilder builder)
        {
            builder
                .Annotation("SqlServer:DefaultSequenceName", "DefaultSequence")
                .Annotation("SqlServer:Sequence:.DefaultSequence", "'DefaultSequence', '', '1', '10', '', '', 'Int64', 'False'")
                .Annotation("SqlServer:ValueGeneration", "Sequence");
            
            builder.Entity("tsdemo.logic.Entity.Line", b =>
                {
                    b.Property<int>("id")
                        .GenerateValueOnAdd()
                        .StoreGeneratedPattern(StoreGeneratedPattern.Identity);
                    
                    b.Property<string>("Name");
                    
                    b.Key("id");
                });
            
            builder.Entity("tsdemo.logic.Entity.Operation", b =>
                {
                    b.Property<int>("id")
                        .GenerateValueOnAdd()
                        .StoreGeneratedPattern(StoreGeneratedPattern.Identity);
                    
                    b.Property<int>("LineId");
                    
                    b.Property<string>("Name");
                    
                    b.Key("id");
                });
            
            builder.Entity("tsdemo.logic.Entity.Product", b =>
                {
                    b.Property<int>("id")
                        .GenerateValueOnAdd()
                        .StoreGeneratedPattern(StoreGeneratedPattern.Identity);
                    
                    b.Property<string>("Name");
                    
                    b.Key("id");
                });
            
            builder.Entity("tsdemo.logic.Entity.ProductLine", b =>
                {
                    b.Property<int>("ProductId");
                    
                    b.Property<int>("LineId");
                    
                    b.Key("ProductId", "LineId");
                });
            
            builder.Entity("tsdemo.logic.Entity.Status", b =>
                {
                    b.Property<int>("id")
                        .GenerateValueOnAdd()
                        .StoreGeneratedPattern(StoreGeneratedPattern.Identity);
                    
                    b.Property<bool>("Complete");
                    
                    b.Property<string>("Notes");
                    
                    b.Property<int>("OperationId");
                    
                    b.Property<int>("ProductId");
                    
                    b.Key("id");
                });
            
            builder.Entity("tsdemo.logic.Entity.Operation", b =>
                {
                    b.Reference("tsdemo.logic.Entity.Line")
                        .InverseCollection()
                        .ForeignKey("LineId");
                });
            
            builder.Entity("tsdemo.logic.Entity.ProductLine", b =>
                {
                    b.Reference("tsdemo.logic.Entity.Line")
                        .InverseCollection()
                        .ForeignKey("LineId");
                    
                    b.Reference("tsdemo.logic.Entity.Product")
                        .InverseCollection()
                        .ForeignKey("ProductId");
                });
            
            builder.Entity("tsdemo.logic.Entity.Status", b =>
                {
                    b.Reference("tsdemo.logic.Entity.Operation")
                        .InverseCollection()
                        .ForeignKey("OperationId");
                    
                    b.Reference("tsdemo.logic.Entity.Product")
                        .InverseCollection()
                        .ForeignKey("ProductId");
                });
        }
    }
}
