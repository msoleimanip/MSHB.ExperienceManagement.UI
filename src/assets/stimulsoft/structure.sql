USE [ExperienceManagement_1]
GO
/****** Object:  Table [dbo].[ReportStructure_T]    Script Date: 7/29/2019 11:30:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReportStructure_T](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ReportId] [nvarchar](40) NOT NULL,
	[Configuration] [nvarchar](max) NULL,
	[ProtoType] [nvarchar](max) NULL,
	[CreationDate] [datetime2](7) NOT NULL,
	[LastUpdatedDateTime] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ReportStructure_T] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ReportStructure_T] ON 

INSERT [dbo].[ReportStructure_T] ([Id], [ReportId], [Configuration], [ProtoType], [CreationDate], [LastUpdatedDateTime]) VALUES (3, N'IssueOfUsers', N'{
  "ReportVersion": "2019.3.2",
  "ReportGuid": "9317c1abf05549c1ef3008f5cf1b84fa",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportFile": "Report.mrt",
  "ReportCreated": "/Date(1564247880000+0430)/",
  "ReportChanged": "/Date(1564247880000+0430)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "Centimeters",
  "PreviewSettings": 268435455,
  "Dictionary": {
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "root",
        "Alias": "root",
        "Columns": {
          "0": {
            "Name": "totalIssueCount",
            "Index": -1,
            "NameInSource": "totalIssueCount",
            "Alias": "totalIssueCount",
            "Type": "System.Decimal"
          },
          "1": {
            "Name": "totalIssueUserDetails",
            "Index": -1,
            "NameInSource": "totalIssueUserDetails",
            "Alias": "totalIssueUserDetails",
            "Type": "System.Decimal"
          },
          "2": {
            "Name": "organizationName",
            "Index": -1,
            "NameInSource": "organizationName",
            "Alias": "organizationName",
            "Type": "System.String"
          },
          "3": {
            "Name": "fullName",
            "Index": -1,
            "NameInSource": "fullName",
            "Alias": "fullName",
            "Type": "System.String"
          }
        },
        "NameInSource": "SimpleDataSet.root"
      }
    }
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "41c22bda81cfc365f887207215f68280",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:Transparent",
      "Components": {
        "0": {
          "Ident": "StiHeaderBand",
          "Name": "Headerroot",
          "ClientRectangle": "0,0.4,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueCount",
              "Guid": "45762819b7edd9ebfdf32868a76cd6cc",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueCount"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueUserDetails",
              "Guid": "19f2f7a9d92e4171d13001da6260af24",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueUserDetails"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Headerroot_organizationName",
              "Guid": "386f35d1b743f5b63974045872cd0b8e",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "organizationName"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Headerroot_fullName",
              "Guid": "7ae4c2696068d91c06c4a8f6cc4fb298",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "نام و نام خانوادگی"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "Dataroot",
          "ClientRectangle": "0,2,19.01,0.8",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueCount",
              "Guid": "0e2ceaa8608842c83365a9e9cc9175ca",
              "CanGrow": true,
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueCount}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueUserDetails",
              "Guid": "9dfedff19eefea9abd115701290aa755",
              "CanGrow": true,
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueUserDetails}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Dataroot_organizationName",
              "Guid": "b677565106546416a570868e7f4540ea",
              "CanGrow": true,
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.organizationName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Dataroot_fullName",
              "Guid": "f92343a60c7cbbdbc5503d9c1779e78f",
              "CanGrow": true,
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.fullName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          },
          "DataSourceName": "root"
        },
        "2": {
          "Ident": "StiFooterBand",
          "Name": "Footerroot",
          "ClientRectangle": "0,3.6,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueCount",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueUserDetails",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Footerroot_organizationName",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Footerroot_fullName",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          }
        }
      },
      "PageWidth": 21.01,
      "PageHeight": 29.69,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1,
        "Right": 1,
        "Top": 1,
        "Bottom": 1
      }
    }
  }
}', NULL, CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2019-07-27T17:44:28.8347102' AS DateTime2))
INSERT [dbo].[ReportStructure_T] ([Id], [ReportId], [Configuration], [ProtoType], [CreationDate], [LastUpdatedDateTime]) VALUES (4, N'IssueOfEquipments', N'{
  "ReportVersion": "2019.3.2",
  "ReportGuid": "9317c1abf05549c1ef3008f5cf1b84fa",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportFile": "Report.mrt",
  "ReportCreated": "/Date(1564247880000+0430)/",
  "ReportChanged": "/Date(1564247880000+0430)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "Centimeters",
  "PreviewSettings": 268435455,
  "Dictionary": {
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "root",
        "Alias": "root",
        "Columns": {
          "0": {
            "Name": "totalIssueCount",
            "Index": -1,
            "NameInSource": "totalIssueCount",
            "Alias": "totalIssueCount",
            "Type": "System.Decimal"
          },
          "1": {
            "Name": "totalIssueUserDetails",
            "Index": -1,
            "NameInSource": "totalIssueUserDetails",
            "Alias": "totalIssueUserDetails",
            "Type": "System.Decimal"
          },
          "2": {
            "Name": "organizationName",
            "Index": -1,
            "NameInSource": "organizationName",
            "Alias": "organizationName",
            "Type": "System.String"
          },
          "3": {
            "Name": "fullName",
            "Index": -1,
            "NameInSource": "fullName",
            "Alias": "fullName",
            "Type": "System.String"
          }
        },
        "NameInSource": "SimpleDataSet.root"
      }
    }
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "41c22bda81cfc365f887207215f68280",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:Transparent",
      "Components": {
        "0": {
          "Ident": "StiHeaderBand",
          "Name": "Headerroot",
          "ClientRectangle": "0,0.4,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueCount",
              "Guid": "45762819b7edd9ebfdf32868a76cd6cc",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueCount"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueUserDetails",
              "Guid": "19f2f7a9d92e4171d13001da6260af24",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueUserDetails"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Headerroot_organizationName",
              "Guid": "386f35d1b743f5b63974045872cd0b8e",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "organizationName"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Headerroot_fullName",
              "Guid": "7ae4c2696068d91c06c4a8f6cc4fb298",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "نام و نام خانوادگی"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "Dataroot",
          "ClientRectangle": "0,2,19.01,0.8",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueCount",
              "Guid": "0e2ceaa8608842c83365a9e9cc9175ca",
              "CanGrow": true,
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueCount}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueUserDetails",
              "Guid": "9dfedff19eefea9abd115701290aa755",
              "CanGrow": true,
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueUserDetails}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Dataroot_organizationName",
              "Guid": "b677565106546416a570868e7f4540ea",
              "CanGrow": true,
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.organizationName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Dataroot_fullName",
              "Guid": "f92343a60c7cbbdbc5503d9c1779e78f",
              "CanGrow": true,
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.fullName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          },
          "DataSourceName": "root"
        },
        "2": {
          "Ident": "StiFooterBand",
          "Name": "Footerroot",
          "ClientRectangle": "0,3.6,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueCount",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueUserDetails",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Footerroot_organizationName",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Footerroot_fullName",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          }
        }
      },
      "PageWidth": 21.01,
      "PageHeight": 29.69,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1,
        "Right": 1,
        "Top": 1,
        "Bottom": 1
      }
    }
  }
}', NULL, CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ReportStructure_T] ([Id], [ReportId], [Configuration], [ProtoType], [CreationDate], [LastUpdatedDateTime]) VALUES (5, N'IssueOfUserLikes', N'{
  "ReportVersion": "2019.3.2",
  "ReportGuid": "9317c1abf05549c1ef3008f5cf1b84fa",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportFile": "Report.mrt",
  "ReportCreated": "/Date(1564247880000+0430)/",
  "ReportChanged": "/Date(1564247880000+0430)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "Centimeters",
  "PreviewSettings": 268435455,
  "Dictionary": {
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "root",
        "Alias": "root",
        "Columns": {
          "0": {
            "Name": "totalIssueCount",
            "Index": -1,
            "NameInSource": "totalIssueCount",
            "Alias": "totalIssueCount",
            "Type": "System.Decimal"
          },
          "1": {
            "Name": "totalIssueUserDetails",
            "Index": -1,
            "NameInSource": "totalIssueUserDetails",
            "Alias": "totalIssueUserDetails",
            "Type": "System.Decimal"
          },
          "2": {
            "Name": "organizationName",
            "Index": -1,
            "NameInSource": "organizationName",
            "Alias": "organizationName",
            "Type": "System.String"
          },
          "3": {
            "Name": "fullName",
            "Index": -1,
            "NameInSource": "fullName",
            "Alias": "fullName",
            "Type": "System.String"
          }
        },
        "NameInSource": "SimpleDataSet.root"
      }
    }
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "41c22bda81cfc365f887207215f68280",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:Transparent",
      "Components": {
        "0": {
          "Ident": "StiHeaderBand",
          "Name": "Headerroot",
          "ClientRectangle": "0,0.4,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueCount",
              "Guid": "45762819b7edd9ebfdf32868a76cd6cc",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueCount"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueUserDetails",
              "Guid": "19f2f7a9d92e4171d13001da6260af24",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueUserDetails"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Headerroot_organizationName",
              "Guid": "386f35d1b743f5b63974045872cd0b8e",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "organizationName"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Headerroot_fullName",
              "Guid": "7ae4c2696068d91c06c4a8f6cc4fb298",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "نام و نام خانوادگی"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "Dataroot",
          "ClientRectangle": "0,2,19.01,0.8",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueCount",
              "Guid": "0e2ceaa8608842c83365a9e9cc9175ca",
              "CanGrow": true,
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueCount}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueUserDetails",
              "Guid": "9dfedff19eefea9abd115701290aa755",
              "CanGrow": true,
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueUserDetails}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Dataroot_organizationName",
              "Guid": "b677565106546416a570868e7f4540ea",
              "CanGrow": true,
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.organizationName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Dataroot_fullName",
              "Guid": "f92343a60c7cbbdbc5503d9c1779e78f",
              "CanGrow": true,
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.fullName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          },
          "DataSourceName": "root"
        },
        "2": {
          "Ident": "StiFooterBand",
          "Name": "Footerroot",
          "ClientRectangle": "0,3.6,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueCount",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueUserDetails",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Footerroot_organizationName",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Footerroot_fullName",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          }
        }
      },
      "PageWidth": 21.01,
      "PageHeight": 29.69,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1,
        "Right": 1,
        "Top": 1,
        "Bottom": 1
      }
    }
  }
}', NULL, CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ReportStructure_T] ([Id], [ReportId], [Configuration], [ProtoType], [CreationDate], [LastUpdatedDateTime]) VALUES (6, N'TotalIssue', N'{
  "ReportVersion": "2019.3.2",
  "ReportGuid": "19e63ce816e7dab591916d9b25951390",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportFile": "Report.mrt",
  "ReportCreated": "/Date(1564264080000+0430)/",
  "ReportChanged": "/Date(1564264080000+0430)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "Centimeters",
  "PreviewSettings": 268435455,
  "Dictionary": {
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "root",
        "Alias": "root",
        "Columns": {
          "0": {
            "Name": "totalIssueCount",
            "Index": -1,
            "NameInSource": "totalIssueCount",
            "Alias": "totalIssueCount",
            "Type": "System.Decimal"
          },
          "1": {
            "Name": "totalIssueUserDetails",
            "Index": -1,
            "NameInSource": "totalIssueUserDetails",
            "Alias": "totalIssueUserDetails",
            "Type": "System.Decimal"
          },
          "2": {
            "Name": "organizationName",
            "Index": -1,
            "NameInSource": "organizationName",
            "Alias": "organizationName",
            "Type": "System.String"
          },
          "3": {
            "Name": "fullName",
            "Index": -1,
            "NameInSource": "fullName",
            "Alias": "fullName",
            "Type": "System.String"
          }
        },
        "NameInSource": "SimpleDataSet.root"
      }
    }
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "41c22bda81cfc365f887207215f68280",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:Transparent",
      "Components": {
        "0": {
          "Ident": "StiHeaderBand",
          "Name": "Headerroot",
          "ClientRectangle": "0,0.4,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueCount",
              "Guid": "3fb3c10ced49850b581b6a18df0bea9d",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueCount"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueUserDetails",
              "Guid": "47901c47fc27ff11b8fa24ce0dd742a4",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueUserDetails"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Headerroot_organizationName",
              "Guid": "8a88a625effc7059b3f6008c2dcc62f2",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "organizationName"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Headerroot_fullName",
              "Guid": "e9745002da638eb2121dcb6ebc8a2a96",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "fullName"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "Dataroot",
          "ClientRectangle": "0,2,19.01,0.8",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueCount",
              "Guid": "528aac819112cbfada3789e44e005bd0",
              "CanGrow": true,
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueCount}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueUserDetails",
              "Guid": "8ceb002759ba4a4efe11ccdd6795145f",
              "CanGrow": true,
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueUserDetails}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Dataroot_organizationName",
              "Guid": "d74e8e6f83661a56f68292277ec73127",
              "CanGrow": true,
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.organizationName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Dataroot_fullName",
              "Guid": "bb2825a85bb88624475a918bf200ce94",
              "CanGrow": true,
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.fullName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          },
          "DataSourceName": "root"
        },
        "2": {
          "Ident": "StiFooterBand",
          "Name": "Footerroot",
          "ClientRectangle": "0,3.6,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueCount",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueUserDetails",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Footerroot_organizationName",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Footerroot_fullName",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          }
        }
      },
      "PageWidth": 21.01,
      "PageHeight": 29.69,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1,
        "Right": 1,
        "Top": 1,
        "Bottom": 1
      }
    }
  }
}', NULL, CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2019-07-28T15:15:16.0237603' AS DateTime2))
INSERT [dbo].[ReportStructure_T] ([Id], [ReportId], [Configuration], [ProtoType], [CreationDate], [LastUpdatedDateTime]) VALUES (8, N'IssuesOfOrganization', N'{
  "ReportVersion": "2019.3.2",
  "ReportGuid": "fa51f2be1af504a21bac22fedb0a7a70",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportFile": "Report.mrt",
  "ReportCreated": "/Date(1564264080000+0430)/",
  "ReportChanged": "/Date(1564264080000+0430)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "Centimeters",
  "PreviewSettings": 268435455,
  "Dictionary": {
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "root",
        "Alias": "root",
        "Columns": {
          "0": {
            "Name": "totalIssueCount",
            "Index": -1,
            "NameInSource": "totalIssueCount",
            "Alias": "totalIssueCount",
            "Type": "System.Decimal"
          },
          "1": {
            "Name": "totalIssueUserDetails",
            "Index": -1,
            "NameInSource": "totalIssueUserDetails",
            "Alias": "totalIssueUserDetails",
            "Type": "System.Decimal"
          },
          "2": {
            "Name": "organizationName",
            "Index": -1,
            "NameInSource": "organizationName",
            "Alias": "organizationName",
            "Type": "System.String"
          },
          "3": {
            "Name": "fullName",
            "Index": -1,
            "NameInSource": "fullName",
            "Alias": "fullName",
            "Type": "System.String"
          },
          "4": {
            "Name": "totalIssueDetails",
            "Index": -1,
            "NameInSource": "totalIssueDetails",
            "Alias": "totalIssueDetails",
            "Type": "System.Decimal"
          },
          "5": {
            "Name": "totalUsers",
            "Index": -1,
            "NameInSource": "totalUsers",
            "Alias": "totalUsers",
            "Type": "System.Decimal"
          }
        },
        "NameInSource": "SimpleDataSet.root"
      }
    }
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "41c22bda81cfc365f887207215f68280",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:Transparent",
      "Components": {
        "0": {
          "Ident": "StiHeaderBand",
          "Name": "Headerroot",
          "ClientRectangle": "0,0.4,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueCount",
              "Guid": "0868e0ff61b674550a11f5216f980564",
              "ClientRectangle": "0,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueCount"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueUserDetails",
              "Guid": "3279211fc983431914479269766eae3f",
              "ClientRectangle": "3.2,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueUserDetails"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Headerroot_organizationName",
              "Guid": "56469d6541e80998c105fb57e69102e0",
              "ClientRectangle": "6.4,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "organizationName"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Headerroot_fullName",
              "Guid": "1291c06cd214fea4272c2656934babb6",
              "ClientRectangle": "9.6,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "fullName"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "4": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueDetails",
              "Guid": "55a2b5247999d82725449092eac0d8e2",
              "ClientRectangle": "12.8,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueDetails"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "5": {
              "Ident": "StiText",
              "Name": "Headerroot_totalUsers",
              "Guid": "87c258a4dbfd5eafb68cc99777d75e3f",
              "ClientRectangle": "16,0,3,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalUsers"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "Dataroot",
          "ClientRectangle": "0,2,19.01,0.8",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueCount",
              "Guid": "7fc84127bc9b2c74e116aeb9d41e3e40",
              "CanGrow": true,
              "ClientRectangle": "0,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueCount}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueUserDetails",
              "Guid": "dcf75a3aee0dda96c742366947d38bab",
              "CanGrow": true,
              "ClientRectangle": "3.2,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueUserDetails}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Dataroot_organizationName",
              "Guid": "072789f28c62d62b6ca46532fe2e6ee2",
              "CanGrow": true,
              "ClientRectangle": "6.4,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.organizationName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Dataroot_fullName",
              "Guid": "b552b1eda474438e71fdde9c5ceb0851",
              "CanGrow": true,
              "ClientRectangle": "9.6,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.fullName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "4": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueDetails",
              "Guid": "4078d1a4faf79f3baa847c2c3ff2e6d2",
              "CanGrow": true,
              "ClientRectangle": "12.8,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueDetails}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "5": {
              "Ident": "StiText",
              "Name": "Dataroot_totalUsers",
              "Guid": "549198744648c66398525651b1933e4c",
              "CanGrow": true,
              "ClientRectangle": "16,0,3,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalUsers}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          },
          "DataSourceName": "root"
        },
        "2": {
          "Ident": "StiFooterBand",
          "Name": "Footerroot",
          "ClientRectangle": "0,3.6,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueCount",
              "ClientRectangle": "0,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueUserDetails",
              "ClientRectangle": "3.2,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Footerroot_organizationName",
              "ClientRectangle": "6.4,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Footerroot_fullName",
              "ClientRectangle": "9.6,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "4": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueDetails",
              "ClientRectangle": "12.8,0,3.2,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "5": {
              "Ident": "StiText",
              "Name": "Footerroot_totalUsers",
              "ClientRectangle": "16,0,3,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          }
        }
      },
      "PageWidth": 21.01,
      "PageHeight": 29.69,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1,
        "Right": 1,
        "Top": 1,
        "Bottom": 1
      }
    }
  }
}', NULL, CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2019-07-28T15:50:53.1373892' AS DateTime2))
INSERT [dbo].[ReportStructure_T] ([Id], [ReportId], [Configuration], [ProtoType], [CreationDate], [LastUpdatedDateTime]) VALUES (10, N'UsersActivation', N'{
  "ReportVersion": "2019.3.2",
  "ReportGuid": "9317c1abf05549c1ef3008f5cf1b84fa",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportFile": "Report.mrt",
  "ReportCreated": "/Date(1564247880000+0430)/",
  "ReportChanged": "/Date(1564247880000+0430)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "Centimeters",
  "PreviewSettings": 268435455,
  "Dictionary": {
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "root",
        "Alias": "root",
        "Columns": {
          "0": {
            "Name": "totalIssueCount",
            "Index": -1,
            "NameInSource": "totalIssueCount",
            "Alias": "totalIssueCount",
            "Type": "System.Decimal"
          },
          "1": {
            "Name": "totalIssueUserDetails",
            "Index": -1,
            "NameInSource": "totalIssueUserDetails",
            "Alias": "totalIssueUserDetails",
            "Type": "System.Decimal"
          },
          "2": {
            "Name": "organizationName",
            "Index": -1,
            "NameInSource": "organizationName",
            "Alias": "organizationName",
            "Type": "System.String"
          },
          "3": {
            "Name": "fullName",
            "Index": -1,
            "NameInSource": "fullName",
            "Alias": "fullName",
            "Type": "System.String"
          }
        },
        "NameInSource": "SimpleDataSet.root"
      }
    }
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "41c22bda81cfc365f887207215f68280",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:Transparent",
      "Components": {
        "0": {
          "Ident": "StiHeaderBand",
          "Name": "Headerroot",
          "ClientRectangle": "0,0.4,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueCount",
              "Guid": "45762819b7edd9ebfdf32868a76cd6cc",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueCount"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Headerroot_totalIssueUserDetails",
              "Guid": "19f2f7a9d92e4171d13001da6260af24",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "totalIssueUserDetails"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Headerroot_organizationName",
              "Guid": "386f35d1b743f5b63974045872cd0b8e",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "organizationName"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Headerroot_fullName",
              "Guid": "7ae4c2696068d91c06c4a8f6cc4fb298",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "نام و نام خانوادگی"
              },
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "Dataroot",
          "ClientRectangle": "0,2,19.01,0.8",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueCount",
              "Guid": "0e2ceaa8608842c83365a9e9cc9175ca",
              "CanGrow": true,
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueCount}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Dataroot_totalIssueUserDetails",
              "Guid": "9dfedff19eefea9abd115701290aa755",
              "CanGrow": true,
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.totalIssueUserDetails}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Dataroot_organizationName",
              "Guid": "b677565106546416a570868e7f4540ea",
              "CanGrow": true,
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.organizationName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Dataroot_fullName",
              "Guid": "f92343a60c7cbbdbc5503d9c1779e78f",
              "CanGrow": true,
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{root.fullName}"
              },
              "VertAlignment": "Center",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          },
          "DataSourceName": "root"
        },
        "2": {
          "Ident": "StiFooterBand",
          "Name": "Footerroot",
          "ClientRectangle": "0,3.6,19.01,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:Transparent",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueCount",
              "ClientRectangle": "0,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Footerroot_totalIssueUserDetails",
              "ClientRectangle": "4.8,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Footerroot_organizationName",
              "ClientRectangle": "9.6,0,4.8,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Footerroot_fullName",
              "ClientRectangle": "14.4,0,4.6,0.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:Transparent",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              }
            }
          }
        }
      },
      "PageWidth": 21.01,
      "PageHeight": 29.69,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1,
        "Right": 1,
        "Top": 1,
        "Bottom": 1
      }
    }
  }
}', NULL, CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2018-01-01T00:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[ReportStructure_T] OFF
ALTER TABLE [dbo].[ReportStructure_T] ADD  DEFAULT (getdate()) FOR [CreationDate]
GO
