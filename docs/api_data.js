define({ "api": [
  {
    "group": "biomes",
    "type": "get",
    "url": "/biomes",
    "title": "getAll",
    "name": "getAllBiomes",
    "version": "0.1.0",
    "description": "<p>Get all biomes information (without geometry)</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "biomes",
            "description": "<p>list of biomes</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.id_biome",
            "description": "<p>biome id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "biomes.name",
            "description": "<p>biome name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.compensation_factor",
            "description": "<p>biome compensation factor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "biomes.general_name",
            "description": "<p>biome full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "biomes.release_date",
            "description": "<p>biome release date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id_biome\": 1,\n    \"name\": \"Halobioma Alta Guajira\",\n    \"compensation_factor\": \"6.00\",\n    \"general_name\": \"Halobioma\",\n    \"release_date\": null\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/biomes",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/biomes.js",
    "groupTitle": "Biomes",
    "groupDescription": "<p>Endpoints related with queries about biomes</p>"
  },
  {
    "group": "comp_companiesProjectsStrategies",
    "type": "post",
    "url": "/companies/:id_company/projects/:id_project/strategies",
    "title": "createProjectStrategy",
    "name": "createProjectStrategy",
    "version": "0.1.0",
    "description": "<p>Create a new strategy as part of the selected strategies of the given project</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project associated with this strategy</p>"
          }
        ],
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Object",
            "optional": false,
            "field": "strategy",
            "description": "<p>strategy to be created</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_biome",
            "description": "<p>biome to associate with the strategy</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "strategy.id_ea",
            "description": "<p>environmental authority to associate with the strategy</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_subzone",
            "description": "<p>'subzona hidrográfica' to associate with the strategy</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_strategy",
            "description": "<p>strategy to associate with</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "strategy.area",
            "description": "<p>area (in ha) included with this strategy</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_user",
            "description": "<p>user that created the strategy</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": true,
            "field": "strategy.area_status",
            "description": "<p>???</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id_biome\": 178,\n  \"id_ea\": \"CORPOBOYACA\",\n  \"id_subzone\": 2403,\n  \"id_strategy\": 10,\n  \"area\": 150,\n  \"id_user\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "strategy",
            "description": "<p>new strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.id",
            "description": "<p>newly created strategy id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_biome",
            "description": "<p>biome to associate with the strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "strategy.id_ea",
            "description": "<p>environmental authority to associate with the strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_subzone",
            "description": "<p>'subzona hidrográfica' to associate with the strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_strategy",
            "description": "<p>strategy to associate with</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.area",
            "description": "<p>area (in ha) included with this strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_project",
            "description": "<p>project associated with this strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_user",
            "description": "<p>user that created the strategy</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"id\": 4,\n  \"id_biome\": 178,\n  \"id_ea\": \"CORPOBOYACA\",\n  \"id_subzone\": 2403,\n  \"id_strategy\": 10,\n  \"area\": 150,\n  \"id_project\": 11,\n  \"id_user\": 1\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects/1/strategies",
        "type": "bash"
      }
    ],
    "filename": "services/backend/src/routes/project_strategies.js",
    "groupTitle": "Compensation > Companies/Projects/Strategies",
    "groupDescription": "<p>Queries and actions directly related with projects strategies selected inside a project</p>"
  },
  {
    "group": "comp_companiesProjectsStrategies",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project/strategies/download",
    "title": "downloadSelectedStrategies",
    "name": "downloadSelectedStrategies",
    "version": "0.1.0",
    "description": "<p>Generate a GeoJson file that includes all selected strategies information for a given project</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "File",
            "optional": false,
            "field": "strategies.geojson",
            "description": "<p>GeoJson file with selected strategies as features</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects/1/strategies/download",
        "type": "bash"
      }
    ],
    "filename": "services/backend/src/routes/project_strategies.js",
    "groupTitle": "Compensation > Companies/Projects/Strategies",
    "groupDescription": "<p>Queries and actions directly related with projects strategies selected inside a project</p>"
  },
  {
    "group": "comp_companiesProjectsStrategies",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project/strategies",
    "title": "listProjectStrategies",
    "name": "listProjectStrategies",
    "version": "0.1.0",
    "description": "<p>List all saved (selected) strategies associated with the given project</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "strategies",
            "description": "<p>list of strategies</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategies.id",
            "description": "<p>strategy id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategies.id_biome",
            "description": "<p>biome associated with the strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "strategies.id_ea",
            "description": "<p>environmental authority associated with the strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategies.id_subzone",
            "description": "<p>'subzona hidrográfica' associated with the strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategies.id_strategy",
            "description": "<p>strategy id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategies.area",
            "description": "<p>strategy area</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategies.id_project",
            "description": "<p>project associated with this strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategies.id_user",
            "description": "<p>user that created the strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.biome",
            "description": "<p>associated biome object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.biome.id_biome",
            "description": "<p>biome id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.biome.name",
            "description": "<p>biome name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.ea",
            "description": "<p>associated ea object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.ea.id_ea",
            "description": "<p>ea id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.ea.name",
            "description": "<p>ea name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.szh",
            "description": "<p>associated sub-basin object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.szh.id_szh",
            "description": "<p>sub-basin id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.szh.name",
            "description": "<p>sub-basin name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.strategy",
            "description": "<p>associated strategy object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.strategy.id_strategy",
            "description": "<p>strategy id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "strategy.strategy.name",
            "description": "<p>strategy name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id\": 54,\n    \"id_biome\": 201,\n    \"id_ea\": \"CVC\",\n    \"id_subzone\": 5311,\n    \"id_strategy\": 1,\n    \"area\": \"10.00\",\n    \"id_project\": 1,\n    \"id_user\": \"1\",\n    \"biome\": {\n      \"id_biome\": 201,\n      \"name\": \"Orobioma Azonal Subandino Cauca medio\"\n    },\n    \"ea\": {\n      \"id_ea\": \"CVC\",\n      \"name\": \"Corporacion Autonoma Regional del Valle del Cauca\"\n    },\n    \"szh\": {\n      \"id_subzone\": 5311,\n      \"name_subzone\": \"Dagua - Buenaventura - Bahia Málaga\"\n    },\n    \"strategy\": {\n      \"id_strategy\": 1,\n      \"strategy\": \"Áreas de interes regional para la posible declaración de áreas protegidas\"\n    }\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects/1/strategies",
        "type": "bash"
      }
    ],
    "filename": "services/backend/src/routes/project_strategies.js",
    "groupTitle": "Compensation > Companies/Projects/Strategies",
    "groupDescription": "<p>Queries and actions directly related with projects strategies selected inside a project</p>"
  },
  {
    "group": "comp_companiesProjects",
    "type": "post",
    "url": "/companies/:id_company/projects/:id_project/biomes",
    "title": "addImpactedBiomes",
    "name": "addImpactedBiomes",
    "version": "0.1.0",
    "description": "<p>Associate a set of biomes as impacted by a given project. This automatically updates the associated project total area</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project id</p>"
          }
        ],
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Object[]",
            "optional": false,
            "field": "biomes",
            "description": "<p>array of biomes to associate with the project</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "biomes.id_biome",
            "description": "<p>biome id</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": true,
            "field": "biomes.id_ea",
            "description": "<p>environmental</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": true,
            "field": "biomes.id_subzone",
            "description": "<p>sub-basin id</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": true,
            "field": "biomes.natural_area_ha",
            "description": "<p>natural area affected in this biome</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": true,
            "field": "biomes.secondary_area_ha",
            "description": "<p>secondary area affected in this biome</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": true,
            "field": "biomes.transformed_area_ha",
            "description": "<p>transformed area affected in this biome</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": true,
            "field": "biomes.area_impacted_ha",
            "description": "<p>total area affected in this biome</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": true,
            "field": "biomes.area_to_compensate_ha",
            "description": "<p>area to compensate for this biome</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": true,
            "field": "biomes.area_impacted_pct",
            "description": "<p>percentage that represents this biome in the total project area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "[\n  {\n    \"id_biome\": 178,\n    \"natural_area_ha\": 0,\n    \"secondary_area_ha\": 0,\n    \"transformed_area_ha\": 0,\n    \"area_impacted_ha\": 0,\n    \"area_to_compensate_ha\": 0\n    \"area_impacted_pct\": 0\n  },\n  {\n    \"id_ea\": \"CORPOBOYACA\",\n    \"id_biome\": 178,\n    \"id_subzone\": 2403,\n    \"natural_area_ha\": 10,\n    \"secondary_area_ha\": 20,\n    \"transformed_area_ha\": 30,\n    \"area_impacted_ha\": 60,\n    \"area_to_compensate_ha\": 100\n    \"area_impacted_pct\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "biomes",
            "description": "<p>array of biomes to associate with the project</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.id",
            "description": "<p>association id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.id_biome",
            "description": "<p>biome id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.id_ea",
            "description": "<p>environmental</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.id_subzone",
            "description": "<p>sub-basin id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.natural_area_ha",
            "description": "<p>natural area affected in this biome</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.secondary_area_ha",
            "description": "<p>secondary area affected in this biome</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.transformed_area_ha",
            "description": "<p>transformed area affected in this biome</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.area_impacted_ha",
            "description": "<p>total area affected in this biome</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.area_to_compensate_ha",
            "description": "<p>area to compensate for this biome</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biomes.area_impacted_pct",
            "description": "<p>percentage that represents this biome in the total project area</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "biomes.is_preloaded",
            "description": "<p>indicates if the biome was associated to the project through the platform (false) or by other way</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id_biome\": 178,\n    \"natural_area_ha\": 0,\n    \"secondary_area_ha\": 0,\n    \"transformed_area_ha\": 0,\n    \"area_impacted_ha\": 0,\n    \"area_to_compensate_ha\": 0,\n    \"is_preloaded\": false,\n    \"id_project\": 1,\n    \"id\": 16\n  },\n  {\n    \"id_project\": 1,\n    \"id_ea\": \"CORPOBOYACA\",\n    \"id_biome\": 178,\n    \"id_subzone\": 2403,\n    \"natural_area_ha\": 10,\n    \"secondary_area_ha\": 20,\n    \"transformed_area_ha\": 30,\n    \"area_impacted_ha\": 60,\n    \"area_to_compensate_ha\": 100,\n    \"is_preloaded\": false,\n    \"id\": 17\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects/1/biomes",
        "type": "bash"
      }
    ],
    "filename": "services/backend/src/routes/projects.js",
    "groupTitle": "Compensation > Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "comp_companiesProjects",
    "type": "post",
    "url": "/companies/:id_company/projects",
    "title": "createProject",
    "name": "createProject",
    "version": "0.1.0",
    "description": "<p>Create a project</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          }
        ],
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>object to be created</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "project.name",
            "description": "<p>project name</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": true,
            "field": "project.details",
            "description": "<p>extra information about the project</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": true,
            "field": "project.prj_status",
            "description": "<p>project status</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "project.id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "project.id_region",
            "description": "<p>project region</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id_company\": 1,\n  \"id_region\": \"ZONA OCCIDENTE\",\n  \"name\": \"test project\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>new project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.gid",
            "description": "<p>newly created project id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.name",
            "description": "<p>project name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "project.area_ha",
            "description": "<p>project area</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "project.details",
            "description": "<p>information about the project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "project.prj_status",
            "description": "<p>project status</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "project.id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.id_region",
            "description": "<p>project region</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"id_company\": 1,\n  \"id_region\": \"ZONA OCCIDENTE\",\n  \"name\": \"test project2\",\n  \"gid\": 18\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects",
        "type": "bash"
      }
    ],
    "filename": "services/backend/src/routes/projects.js",
    "groupTitle": "Compensation > Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "comp_companiesProjects",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project/biomes",
    "title": "getImpactedBiomes",
    "name": "getImpactedBiomes",
    "version": "0.1.0",
    "description": "<p>Get the impacted biomes for a given project</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>impacted biomes info</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result.biomes",
            "description": "<p>information for each biomes</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.id",
            "description": "<p>impacted biome id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.id_project",
            "description": "<p>impacted biome associated project</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.natural_area_ha",
            "description": "<p>natural area impacted</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.secondary_area_ha",
            "description": "<p>secondary area impacted</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.transformed_area_ha",
            "description": "<p>transformed area impacted</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.area_impacted_ha",
            "description": "<p>total area impacted</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.area_to_compensate_ha",
            "description": "<p>total area to compensate</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.id_biome",
            "description": "<p>impacted biome id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.biomes.area_impacted_pct",
            "description": "<p>percentage that this biome area represents for the hole project area</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.biomes.biome",
            "description": "<p>impacted biome info</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.biomes.biome.name",
            "description": "<p>impacted biome name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.biomes.biome.compensation_factor",
            "description": "<p>impacted biome compensation factor</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.geometry",
            "description": "<p>geoJSON with all biomes as features</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"biomes\": [\n    {\n      \"id\": 91,\n      \"id_project\": 11,\n      \"natural_area_ha\": null,\n      \"secondary_area_ha\": \"2.1978\",\n      \"transformed_area_ha\": null,\n      \"area_impacted_ha\": \"2.1978\",\n      \"area_to_compensate_ha\": \"2.1978\",\n      \"id_biome\": 18,\n      \"biome\": {\n        \"id_biome\": 18,\n        \"name\": \"Helobioma Altoandino cordillera oriental\",\n        \"compensation_factor\": \"7.00\"\n      }\n    },...\n  ],\n  \"geometry\": {\n    \"type\": \"FeatureCollection\",\n    \"features\": [\n      {\n        \"type\": \"Feature\",\n        \"properties\": {\n          \"gid\": 120,\n          \"name\": \"Hidrobioma Nechí-San Lucas\",\n          \"compensation_factor\": 5.5,\n          \"id_biome\": 113\n        },\n        \"geometry\": {...}\n      }...\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects/1/biomes",
        "type": "bash"
      }
    ],
    "filename": "services/backend/src/routes/projects.js",
    "groupTitle": "Compensation > Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "comp_companiesProjects",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project",
    "title": "getProjectById",
    "name": "getProjectById",
    "version": "0.1.0",
    "description": "<p>Find a project by its id</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>project information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "project.gid",
            "description": "<p>project id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.name",
            "description": "<p>project name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.prj_status",
            "description": "<p>project status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.id_region",
            "description": "<p>region in which is the project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.area_ha",
            "description": "<p>project area</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.id_company",
            "description": "<p>company that owns the project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.label",
            "description": "<p>pretty project name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"gid\": 1,\n  \"name\": \"ALFEREZ-SANMARCOS\",\n  \"prj_status\": \"DAA\",\n  \"id_region\": \"ZONA OCCIDENTE\",\n  \"area_ha\": \"233.73530000000\",\n  \"id_company\": 1,\n  \"label\": \"Alferez Sanmarcos\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects/1",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/projects.js",
    "groupTitle": "Compensation > Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "comp_companiesProjects",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project/decisionTree",
    "title": "impactedBiomesDecisionTree",
    "name": "impactedBiomesDecisionTree",
    "version": "0.1.0",
    "description": "<p>Get the impacted biomes decision tree for a given project</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tree",
            "description": "<p>the decision tree</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tree.biome",
            "description": "<p>biome name (starting point on the decision tree)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tree.biome.subzone",
            "description": "<p>sub-basin name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tree.biome.subzone.ea",
            "description": "<p>environmental authority name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tree.biome.subzone.ea.id_biome",
            "description": "<p>impacted biome id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tree.biome.subzone.ea.biome_name",
            "description": "<p>biome name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tree.biome.subzone.ea.id_ea",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tree.biome.subzone.ea.ea_name",
            "description": "<p>environmental authority name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tree.biome.subzone.ea.id_subzone",
            "description": "<p>sub-basin id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tree.biome.subzone.ea.nom_szh",
            "description": "<p>sub-basin name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"Hidrobioma Cauca medio\": {\n    \"Rio Tapias y otros directos al Cauca\": {\n      \"Corporacion Autonoma Regional de Risaralda\": [\n        {\n          \"id_biome\": 92,\n          \"biome_name\": \"Hidrobioma Cauca medio\",\n          \"ea_name\": \"Corporacion Autonoma Regional de Risaralda\",\n          \"id_subzone\": 2616,\n          \"nom_szh\": \"Rio Tapias y otros directos al Cauca\",\n          \"id_ea\": \"CARDER\"\n        }\n      ],\n      \"Corporacion Autonoma Regional de Caldas\": [\n        {\n          \"id_biome\": 92,\n          \"biome_name\": \"Hidrobioma Cauca medio\",\n          \"ea_name\": \"Corporacion Autonoma Regional de Caldas\",\n          \"id_subzone\": 2616,\n          \"nom_szh\": \"Rio Tapias y otros directos al Cauca\",\n          \"id_ea\": \"CORPOCALDAS\"\n        }\n      ]\n    }...\n  }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects/1/decisionTree",
        "type": "bash"
      }
    ],
    "filename": "services/backend/src/routes/projects.js",
    "groupTitle": "Compensation > Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "comp_companiesProjects",
    "type": "get",
    "url": "/companies/:id_company/projects",
    "title": "listProjectsByCompany",
    "name": "listProjectsByCompany",
    "version": "0.1.0",
    "description": "<p>Find all projects that belongs to a given company. If group_props is passed, results will be grouped by the first prop, then by the second, so on.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>company id to get projects</p>"
          }
        ],
        "Query params": [
          {
            "group": "Query params",
            "type": "String[]",
            "optional": true,
            "field": "group_props",
            "description": "<p>list of properties to group results by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "project",
            "description": "<p>project information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "project.gid",
            "description": "<p>project id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.name",
            "description": "<p>project name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.prj_status",
            "description": "<p>project status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.id_region",
            "description": "<p>region in which is the project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.area_ha",
            "description": "<p>project area</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.id_company",
            "description": "<p>company that owns the project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project.label",
            "description": "<p>pretty project name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"gid\": 1,\n    \"name\": \"ALFEREZ-SANMARCOS\",\n    \"prj_status\": \"DAA\",\n    \"id_region\": \"ZONA OCCIDENTE\",\n    \"area_ha\": \"233.73530000000\",\n    \"id_company\": 1,\n    \"label\": \"Alferez Sanmarcos\"\n  }...\n]",
          "type": "json"
        },
        {
          "title": "group_props success-Example:",
          "content": "{\n  \"ZONA OCCIDENTE\": {\n    \"DAA\": [\n      {\n        \"gid\": 1,\n        \"name\": \"ALFEREZ-SANMARCOS\",\n        \"prj_status\": \"DAA\",\n        \"id_region\": \"ZONA OCCIDENTE\",\n        \"area_ha\": \"233.73530000000\",\n        \"id_company\": 1,\n        \"label\": \"Alferez Sanmarcos\"\n      }...\n    ],\n    \"LICENCIADO\": [...]\n  }...\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/companies/1/projects",
        "type": "curl"
      },
      {
        "title": "group_props example:",
        "content": "/companies/1/projects?group_props=id_region,prj_status",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/projects.js",
    "groupTitle": "Compensation > Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "comp_strategies",
    "type": "post",
    "url": "/strategies/biomeSubzoneEA",
    "title": "listStrategiesByBiomeSubzoneEA",
    "name": "listStrategiesByBiomeSubzoneEA",
    "version": "0.1.0",
    "description": "<p>List all strategies filtered by biome, sub-basin and environmental authority. They are grouped by strategy type (id)</p> <p><strong>Some of the response properties are GeoJson standard properties, so they are not described here.</strong></p>",
    "parameter": {
      "fields": {
        "Body params": [
          {
            "group": "Body params",
            "type": "Number",
            "optional": false,
            "field": "id_biome",
            "description": "<p>biome id</p>"
          },
          {
            "group": "Body params",
            "type": "Number",
            "optional": false,
            "field": "id_subzone",
            "description": "<p>sub-basin id</p>"
          },
          {
            "group": "Body params",
            "type": "String",
            "optional": false,
            "field": "id_ea",
            "description": "<p>environmental authority id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id_biome\": 284,\n  \"id_subzone\": 3730\n  \"id_ea\": \"CORPOBOYACA\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "object",
            "description": "<p>response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "object.strategies",
            "description": "<p>array of strategies information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "object.strategies.id",
            "description": "<p>strategy id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "object.strategies.area_ha",
            "description": "<p>total area for this strategy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "object.strategies.strategy_name",
            "description": "<p>strategy name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "object.geometry",
            "description": "<p>geometry geoJson object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "object.geometry.features",
            "description": "<p>information and geometry for each strategy</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"strategies\": [\n    {\n      \"area_ha\": 8546.040000000005,\n      \"id\": \"2\",\n      \"strategy_name\": \"Preservación dentro de áreas declaradas\"\n    }...\n  ],\n  \"geometry\": {\n    \"type\": \"FeatureCollection\",\n    \"features\": [\n      {\n        \"type\": \"Feature\",\n        \"properties\": {\n          \"gid\": 538112,\n          \"area_ha\": 426.15,\n          \"area_status\": \"Transformado\",\n          \"strategy\": \"No sugerido para compensar pérdidas de biodiversidad\"\n          \"id_strategy\": 7\n        },\n        \"geometry\": {...}\n      }...\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/strategies/biomeEASubzone",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/strategies.js",
    "groupTitle": "Compensation > Strategies",
    "groupDescription": "<p>Endpoints related with queries about strategies</p>"
  },
  {
    "group": "geofence_bs",
    "type": "get",
    "url": "/basinSubzones/layers/national",
    "title": "NationalLayer",
    "name": "BasinSubzoneNationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by basin subzones</p>",
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, etc)</p>"
          },
          {
            "group": "geojson",
            "type": "Object",
            "optional": false,
            "field": "result.crs",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n   type: 'FeatureCollection',\n   totalFeatures: 1,\n   features: [\n     type: 'Feature',\n     id: 'jurisdicciones_low.1',\n     geometry: {\n       type: 'MultiPolygon',\n       coordinates: [\n         [\n           [\n             [-79.2778, 16.1152],\n             [-79.2778, 16.0708],\n             [-79.1453, 16.0708]\n           ]\n         ]\n       ]\n     }\n     geometry_name: 'the_geom',\n     properties: {\n       AREA: 180336000000,\n       IDCAR: 'CORALINA'\n     }\n   ]\n   crs: {\n     type: 'name',\n     properties: {\n       name: 'urn:ogc:def:crs:EPSG::4326'\n     }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/layers/national",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Geofence > Basin subzones",
    "groupDescription": "<p>Information exclusively about basins: areas, zones and subzones: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_bs",
    "type": "get",
    "url": "/basinSubzones/:subzone_id",
    "title": "SubzoneDetails",
    "name": "SubzoneDetails",
    "version": "0.1.0",
    "description": "<p>Get details about an specific subzone. For now, only the total area is returned.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.total_area",
            "description": "<p>Area for the specified subzone</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"total_area\": 319877.03\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/3502",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Geofence > Basin subzones",
    "groupDescription": "<p>Information exclusively about basins: areas, zones and subzones: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_bs",
    "type": "get",
    "url": "/basinSubzones/layers/:subzone_id",
    "title": "SubzoneLayer",
    "name": "SubzoneLayer",
    "version": "0.1.0",
    "description": "<p>Get the layer for an specific basin subzone</p>",
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Array[]",
            "optional": false,
            "field": "result.coordinates",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"id\": 269,\n        \"key\": \"Río Guayuriba\"\n      },\n      \"geometry\": {\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              -73.8291702258294,\n              4.75750017293779\n            ],\n            ...\n          ]\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/layers/3502",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Geofence > Basin subzones",
    "groupDescription": "<p>Information exclusively about basins: areas, zones and subzones: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_bs",
    "type": "get",
    "url": "/basinAreas",
    "title": "listBasinAreas",
    "name": "listBasinAreas",
    "version": "0.1.0",
    "description": "<p>List all available basin areas</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "basin_areas",
            "description": "<p>list of basin areas</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "basin_areas.id",
            "description": "<p>basin area id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "basin_areas.name",
            "description": "<p>basin area name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id\": \"3\",\n    \"name\": \"Orinoco\"\n  },\n  {\n    \"id\": \"4\",\n    \"name\": \"Amazonas\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinAreas",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basins.js",
    "groupTitle": "Geofence > Basin subzones",
    "groupDescription": "<p>Information exclusively about basins: areas, zones and subzones: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_bs",
    "type": "get",
    "url": "/basinSubzones",
    "title": "listBasinSubzones",
    "name": "listBasinSubzones",
    "version": "0.1.0",
    "description": "<p>List all available basin sub-zones</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "basin_sub-zones",
            "description": "<p>list of basin sub-zones</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "basin_sub-zones.id_subzone",
            "description": "<p>basin subzone id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "basin_sub-zones.name_subzo",
            "description": "<p>basin subzone name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "basin_sub-zones.id_basin",
            "description": "<p>associated basin area id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "basin_sub-zones.id_zone",
            "description": "<p>associated basin zone id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id\": \"2626\",\n    \"name\": \"Directos Bajo Cauca - Cga La Raya entre río Nechí\",\n    \"id_zone\": \"25\",\n    \"id_basin\": \"2\"\n  },\n  {\n    \"id\": \"2120\",\n    \"name\": \"Río Bogotá\",\n    \"id_zone\": \"21\",\n    \"id_basin\": \"2\"\n  },\n  {\n    \"id\": \"3201\",\n    \"name\": \"Río Guayabero\",\n    \"id_zone\": \"32\",\n    \"id_basin\": \"3\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Geofence > Basin subzones",
    "groupDescription": "<p>Information exclusively about basins: areas, zones and subzones: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_bs",
    "type": "get",
    "url": "/basinZones",
    "title": "listBasinZones",
    "name": "listBasinZones",
    "version": "0.1.0",
    "description": "<p>List all available basin zones</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "basin_zones",
            "description": "<p>list of basin zones</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "basin_zones.id",
            "description": "<p>basin zone id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "basin_zones.name",
            "description": "<p>basin zone name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "basin_zones.id_basin",
            "description": "<p>associated basin area id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id\": \"55\",\n    \"name\": \"Baudó - Directos Pacifico\",\n    \"id_basin\": \"5\"\n  },\n  {\n    \"id\": \"52\",\n    \"name\": \"Patía\",\n    \"id_basin\": \"5\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinZones",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basins.js",
    "groupTitle": "Geofence > Basin subzones",
    "groupDescription": "<p>Information exclusively about basins: areas, zones and subzones: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_ea",
    "type": "get",
    "url": "/ea/layers/:ea_id/biomes",
    "title": "BiomesLayerInEA",
    "name": "BiomesLayerInEA",
    "version": "0.1.0",
    "description": "<p>Find all biomes that belong to the given environmental authority.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id to filter biomes</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>GeoJSONJ object</p>"
          },
          {
            "group": "geojson",
            "type": "Object",
            "optional": false,
            "field": "result.features.properties",
            "description": "<p>Specific properties for each feature</p>"
          },
          {
            "group": "geojson",
            "type": "Number",
            "optional": false,
            "field": "result.features.properties.gid",
            "description": "<p>feature id</p>"
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.features.properties.name_biome",
            "description": "<p>biome name</p>"
          },
          {
            "group": "geojson",
            "type": "Number",
            "optional": false,
            "field": "result.features.properties.id_biome",
            "description": "<p>biome id</p>"
          },
          {
            "group": "geojson",
            "type": "Number",
            "optional": false,
            "field": "result.features.properties.compensation_factor",
            "description": "<p>biome CF</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"gid\": 252,\n        \"name_biome\": \"Hidrobioma Magdalena medio y depresión momposina\"\n        \"id_biome\": 41,\n        \"compensation_factor\": 6.5\n      },\n      \"geometry\": {\n        \"type\": \"MultiPolygon\",\n        \"coordinates\": [...]\n      }\n    },...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/layers/CORPOBOYACA/biomes",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Geofence > Environmental Authorities",
    "groupDescription": "<p>Information exclusively about environmental authorities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_ea",
    "type": "get",
    "url": "/ea/:ea_id",
    "title": "EADetails",
    "name": "EADetails",
    "version": "0.1.0",
    "description": "<p>Get details about an specific environmental authority. For now, only the total area is returned</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.total_area",
            "description": "<p>Area for the specified environmental authority</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"total_area\": 319877.03\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/AMVA",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Geofence > Environmental Authorities",
    "groupDescription": "<p>Information exclusively about environmental authorities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_ea",
    "type": "get",
    "url": "/ea/layers/:ea_id",
    "title": "EALayer",
    "name": "EALayer",
    "version": "0.1.0",
    "description": "<p>Get the layer for an specific environmental authority</p>",
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Array[]",
            "optional": false,
            "field": "result.coordinates",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"id\": 269,\n        \"key\": \"Río Guayuriba\"\n      },\n      \"geometry\": {\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              -73.8291702258294,\n              4.75750017293779\n            ],\n            ...\n          ]\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/layers/CRQ",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Geofence > Environmental Authorities",
    "groupDescription": "<p>Information exclusively about environmental authorities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_ea",
    "type": "get",
    "url": "/ea/layers/national",
    "title": "NationalLayer",
    "name": "EANationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by environmental authority</p>",
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, etc)</p>"
          },
          {
            "group": "geojson",
            "type": "Object",
            "optional": false,
            "field": "result.crs",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n   type: 'FeatureCollection',\n   totalFeatures: 1,\n   features: [\n     type: 'Feature',\n     id: 'jurisdicciones_low.1',\n     geometry: {\n       type: 'MultiPolygon',\n       coordinates: [\n         [\n           [\n             [-79.2778, 16.1152],\n             [-79.2778, 16.0708],\n             [-79.1453, 16.0708]\n           ]\n         ]\n       ]\n     }\n     geometry_name: 'the_geom',\n     properties: {\n       AREA: 180336000000,\n       IDCAR: 'CORALINA'\n     }\n   ]\n   crs: {\n     type: 'name',\n     properties: {\n       name: 'urn:ogc:def:crs:EPSG::4326'\n     }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/layers/national",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Geofence > Environmental Authorities",
    "groupDescription": "<p>Information exclusively about environmental authorities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_ea",
    "type": "get",
    "url": "/ea/:ea_id/biome/:name_biome/subzone",
    "title": "SubzonesInBiomeInEA",
    "name": "SubzonesInBiomeInEA",
    "version": "0.1.0",
    "description": "<p>Separate a selected biome inside an environmental authority by basin subzones</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "name_biome",
            "description": "<p>biome name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>basin subzone name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>total area for the associated basin subzone</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"key\": \"Río Carare (Minero)\",\n    \"area\": 217.5024408345576297\n  },\n  {\n    \"key\": \"Río Chicamocha\",\n    \"area\": 1030.6969008182\n  },...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/biome/Orobioma Subandino Guane-Yariguíes/subzone",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Geofence > Environmental Authorities",
    "groupDescription": "<p>Information exclusively about environmental authorities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_ea",
    "type": "get",
    "url": "/ea",
    "title": "listAll",
    "name": "listEA",
    "version": "0.1.0",
    "description": "<p>List all available environmental authorities</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "ea",
            "description": "<p>list of environmental authorities</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ea.id",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ea.name",
            "description": "<p>environmental authority name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id\": \"CRC\",\n    \"name\": \"Corporacion Autonoma Regional del Cauca\"\n  },\n  {\n    \"id\": \"CORPOGUAVIO\",\n    \"name\": \"Corporacion Autonoma Regional del Guavio\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Geofence > Environmental Authorities",
    "groupDescription": "<p>Information exclusively about environmental authorities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_pa",
    "type": "get",
    "url": "/pa/:category/binary_protected",
    "title": "BinaryProtectedByCategory",
    "name": "BinaryProtectedByCategory",
    "version": "0.1.0",
    "description": "<p>Get the binary protected value for the given category name</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.binary_protected",
            "description": "<p>binary protected value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n   binary_protected:\"000001000000000\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/binary_protected",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Geofence > Protected Areas",
    "groupDescription": "<p>Information exclusively about protected areas: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_pa",
    "type": "get",
    "url": "/pa/:category",
    "title": "CategoryDetails",
    "name": "PACategoryDetails",
    "version": "0.1.0",
    "description": "<p>Get details about an specific protected area category. For now, only the total area is returned</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.total_area",
            "description": "<p>Area for the specified category</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"total_area\": 319877.03\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Geofence > Protected Areas",
    "groupDescription": "<p>Information exclusively about protected areas: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_pa",
    "type": "get",
    "url": "/pa/layers/:category",
    "title": "PALayer",
    "name": "PALayer",
    "version": "0.1.0",
    "description": "<p>Get the layer for an specific protected area category</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Array[]",
            "optional": false,
            "field": "result.coordinates",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"id\": 3,\n        \"key\": \"Yaigoje Apaporis\"\n      },\n      \"geometry\": {\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [-71.0454314, -0.01861671],\n            ...\n          ]\n        ]\n      }\n    },\n    ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/layers/Parque Nacional Natural",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Geofence > Protected Areas",
    "groupDescription": "<p>Information exclusively about protected areas: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_pa",
    "type": "get",
    "url": "/pa/layers/national",
    "title": "NationalLayer",
    "name": "PANationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by protected areas</p>",
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, etc)</p>"
          },
          {
            "group": "geojson",
            "type": "Object",
            "optional": false,
            "field": "result.crs",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n   type: 'FeatureCollection',\n   totalFeatures: 1,\n   features: [\n     type: 'Feature',\n     id: 'jurisdicciones_low.1',\n     geometry: {\n       type: 'MultiPolygon',\n       coordinates: [\n         [\n           [\n             [-79.2778, 16.1152],\n             [-79.2778, 16.0708],\n             [-79.1453, 16.0708]\n           ]\n         ]\n       ]\n     }\n     geometry_name: 'the_geom',\n     properties: {\n       AREA: 180336000000,\n       IDCAR: 'CORALINA'\n     }\n   ]\n   crs: {\n     type: 'name',\n     properties: {\n       name: 'urn:ogc:def:crs:EPSG::4326'\n     }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/layers/national",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Geofence > Protected Areas",
    "groupDescription": "<p>Information exclusively about protected areas: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_pa",
    "type": "get",
    "url": "/pa/categories",
    "title": "listCategories",
    "name": "listCategories",
    "version": "0.1.0",
    "description": "<p>List all available protected area categories</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "category",
            "description": "<p>list of protected area categories</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category.name",
            "description": "<p>category name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"name\": \"Reserva Natural de la Sociedad Civil\"\n  },\n  {\n    \"name\": \"Distritos Nacionales de Manejo Integrado\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Geofence > Protected Areas",
    "groupDescription": "<p>Information exclusively about protected areas: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_pa",
    "type": "get",
    "url": "/pa/categories/binary_protected",
    "title": "listCategoriesByBinaryProtected",
    "name": "listCategoriesByBinaryProtected",
    "version": "0.1.0",
    "description": "<p>List available protected area categories for the given binary protected values</p>",
    "parameter": {
      "fields": {
        "Query params": [
          {
            "group": "Query params",
            "type": "String",
            "optional": false,
            "field": "binary_protected",
            "description": "<p>list of binary protected values separated by ;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "category",
            "description": "<p>list of protected area categories for the given binary protected values</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "binary_protected",
            "description": "<p>binary value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>category name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"binary_protected\": \"000001000000000\",\n    \"label\": \"Parques Naturales Regionales\"\n  },\n  {\n    \"binary_protected\": \"010100000000000\",\n    \"label\": \"Distritos de Conservacion de Suelos y Distritos Regionales de Manejo Integrado\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/categories/binary_protected?binary_protected=000001000000000;010100000000000",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Geofence > Protected Areas",
    "groupDescription": "<p>Information exclusively about protected areas: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_se",
    "type": "get",
    "url": "/se/:ecosystem/national",
    "title": "SEDetail",
    "name": "SEDetail",
    "version": "0.1.0",
    "description": "<p>Get the ecosystem national information</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ecosystem",
            "description": "<p>ecosystem type to get. Accepted values: Páramo, Humedal, Bosque Seco Tropical (results from <a href=\"#api-se-listPrimarySE\">listPrimarySE</a> endpoint)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>object with the given ecosystem national information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>national area of the ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>percentage of the ecosystem at national level</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>the queried ecosystem</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"area\": 123456789,\n  \"percentage\": 0.45,\n  \"type\": \"Páramo\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/se/Páramo/national",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/strategic_ecosystems.js",
    "groupTitle": "Geofence > Strategic Ecosystems",
    "groupDescription": "<p>Information exclusively about strategic ecosystems as a geofence: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_se",
    "type": "get",
    "url": "/se/layers/national",
    "title": "NationalLayer",
    "name": "SENationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by strategic ecosystems</p>",
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, etc)</p>"
          },
          {
            "group": "geojson",
            "type": "Object",
            "optional": false,
            "field": "result.crs",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n   type: 'FeatureCollection',\n   totalFeatures: 1,\n   features: [\n     type: 'Feature',\n     id: 'jurisdicciones_low.1',\n     geometry: {\n       type: 'MultiPolygon',\n       coordinates: [\n         [\n           [\n             [-79.2778, 16.1152],\n             [-79.2778, 16.0708],\n             [-79.1453, 16.0708]\n           ]\n         ]\n       ]\n     }\n     geometry_name: 'the_geom',\n     properties: {\n       AREA: 180336000000,\n       IDCAR: 'CORALINA'\n     }\n   ]\n   crs: {\n     type: 'name',\n     properties: {\n       name: 'urn:ogc:def:crs:EPSG::4326'\n     }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/se/layers/national",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/strategic_ecosystems.js",
    "groupTitle": "Geofence > Strategic Ecosystems",
    "groupDescription": "<p>Information exclusively about strategic ecosystems as a geofence: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_se",
    "type": "get",
    "url": "/se/primary",
    "title": "listPrimarySE",
    "name": "listPrimarySE",
    "version": "0.1.0",
    "description": "<p>List only primary types of strategic ecosystems</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>list of strategic ecosystems</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.name",
            "description": "<p>strategic ecosystem name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"name\": \"Páramo\"\n  },\n  {\n    \"name\": \"Humedal\"\n  },\n  {\n    \"name\": \"Bosque Seco Tropical\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/se/primary",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/strategic_ecosystems.js",
    "groupTitle": "Geofence > Strategic Ecosystems",
    "groupDescription": "<p>Information exclusively about strategic ecosystems as a geofence: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_se",
    "type": "get",
    "url": "/se",
    "title": "listAll",
    "name": "listSE",
    "version": "0.1.0",
    "description": "<p>List all available strategic ecosystems</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>list of strategic ecosystems</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.id_ecosystem",
            "description": "<p>strategic ecosystem id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.name",
            "description": "<p>strategic ecosystem name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.second_class",
            "description": "<p>strategic ecosystem second_class</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id_ecosystem\": \"203\",\n    \"name\": \"Páramo\",\n    \"second_class\": \"test\"\n  },\n  {\n    \"id_ecosystem\": \"2000\",\n    \"name\": \"Bosque Seco Tropical\",\n    \"second_class\": \"Sin información\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/se",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/strategic_ecosystems.js",
    "groupTitle": "Geofence > Strategic Ecosystems",
    "groupDescription": "<p>Information exclusively about strategic ecosystems as a geofence: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_states",
    "type": "get",
    "url": "/states/:category",
    "title": "StateDetails",
    "name": "StateDetails",
    "version": "0.1.0",
    "description": "<p>Get details about an specific state. For now, only the total area is returned.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.total_area",
            "description": "<p>Area for the specified state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"total_area\": 319877.03\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/1",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Geofence > States",
    "groupDescription": "<p>Information about states and municipalities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_states",
    "type": "get",
    "url": "/states/layers/:state_id",
    "title": "StateLayer",
    "name": "StateLayer",
    "version": "0.1.0",
    "description": "<p>Get the layer for an specific state</p>",
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Array[]",
            "optional": false,
            "field": "result.coordinates",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"id\": 269,\n        \"key\": \"Río Guayuriba\"\n      },\n      \"geometry\": {\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              -73.8291702258294,\n              4.75750017293779\n            ],\n            ...\n          ]\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/layers/44",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Geofence > States",
    "groupDescription": "<p>Information about states and municipalities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_states",
    "type": "get",
    "url": "/states/layers/national",
    "title": "NationalLayer",
    "name": "StatesNationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by states</p>",
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, etc)</p>"
          },
          {
            "group": "geojson",
            "type": "Object",
            "optional": false,
            "field": "result.crs",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n   type: 'FeatureCollection',\n   totalFeatures: 1,\n   features: [\n     type: 'Feature',\n     id: 'jurisdicciones_low.1',\n     geometry: {\n       type: 'MultiPolygon',\n       coordinates: [\n         [\n           [\n             [-79.2778, 16.1152],\n             [-79.2778, 16.0708],\n             [-79.1453, 16.0708]\n           ]\n         ]\n       ]\n     }\n     geometry_name: 'the_geom',\n     properties: {\n       AREA: 180336000000,\n       IDCAR: 'CORALINA'\n     }\n   ]\n   crs: {\n     type: 'name',\n     properties: {\n       name: 'urn:ogc:def:crs:EPSG::4326'\n     }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/layers/national",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Geofence > States",
    "groupDescription": "<p>Information about states and municipalities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_states",
    "type": "get",
    "url": "/municipalities",
    "title": "listAllMunicipalities",
    "name": "listMunicipalities",
    "version": "0.1.0",
    "description": "<p>List all available municipalities</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "municipality",
            "description": "<p>list of municipalities</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "municipality.municipality",
            "description": "<p>municipality name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "municipality.id_municipality",
            "description": "<p>municipality id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id_municipality\": \"560\",\n    \"municipality\": \"Potosí\"\n  },\n  {\n    \"id_municipality\": \"569\",\n    \"municipality\": \"Puerto Caicedo\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/municipalities",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/municipalities.js",
    "groupTitle": "Geofence > States",
    "groupDescription": "<p>Information about states and municipalities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_states",
    "type": "get",
    "url": "/states",
    "title": "listAll",
    "name": "listStates",
    "version": "0.1.0",
    "description": "<p>List all available states</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "state",
            "description": "<p>list of states</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "state.name",
            "description": "<p>State name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "state.id",
            "description": "<p>State id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id\": \"44\",\n    \"name\": \"La Guajira\"\n  },\n  {\n    \"id\": \"97\",\n    \"name\": \"Vaupés\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Geofence > States",
    "groupDescription": "<p>Information about states and municipalities: details, list all options, national layer</p>"
  },
  {
    "group": "geofence_states",
    "type": "get",
    "url": "/states/:state_id/municipalities",
    "title": "MunicipalitiesInState",
    "name": "stateByMunicipalities",
    "version": "0.1.0",
    "description": "<p>List all municipalities information in the given state</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.municipality",
            "description": "<p>municipality name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.id_municipality",
            "description": "<p>municipality id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"id_municipality\": \"90\",\n    \"municipality\": \"Dibulla\"\n  },\n  {\n    \"id_municipality\": \"560\",\n    \"municipality\": \"Manaure\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/municipalities",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Geofence > States",
    "groupDescription": "<p>Information about states and municipalities: details, list all options, national layer</p>"
  },
  {
    "group": "s_biotic_unit",
    "type": "get",
    "url": "/ea/:ea_id/bioticUnit",
    "title": "BioticUnitInEA",
    "name": "BioticUnitInEA",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by biotic units</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>biotic unit name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>total area for the associated biotic unit</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"key\": \"Altoandino cordillera oriental\",\n    \"area\": 626680961.00\n  },\n  {\n    \"key\": \"Altoandino influencia llanera\",\n    \"area\": 163012538.00\n  },...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/bioticUnit",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Biotic unit",
    "groupDescription": "<p>Information related to biotic units inside geofences</p>"
  },
  {
    "group": "s_compensation_factor",
    "type": "get",
    "url": "/ea/:ea_id/compensationFactor",
    "title": "CompensationFactorInEA",
    "name": "CompensationFactorInEA",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by compensation factor</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>compensation factor value</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>total area for the associated compensation factor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"key\": \"4.5\",\n    \"area\": 9617.51\n  },\n  {\n    \"key\": \"5\",\n    \"area\": 2017.6419239507823\n  },...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/compensationFactor",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Compensation Factor",
    "groupDescription": "<p>Information related to compensation factor inside geofences</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/ea/:ea_id/coverage",
    "title": "CoverageInEA",
    "name": "EAByCoverage",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by coverage type.</p> <p>The result is the list of cover types with area and percentage inside the environmental authority and an extra element with the total environmental authority area.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified coverage respect to the EA.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage in the environmental authority</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/pa/:category/coverage",
    "title": "CoverageInPA",
    "name": "PAByCoverage",
    "version": "0.1.0",
    "description": "<p>Separate the protected area by coverage type.</p> <p>The result is a list of objects (cover types) with area and percentage inside the protected area category and one extra object with the total area of the protected area.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the coverage type respect to the PA.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage in the protected area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/ea/:ea_id/se/:se_type/coverage",
    "title": "SECoverageInEA",
    "name": "SECoverageInEA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific environmental authority, get the coverage distribution in that area.</p> <p>The result is the list of cover types with area and percentage inside the specified strategic ecosystem in the environmental authority.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified coverage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/se/Páramo/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/pa/:category/se/:se_type/coverage",
    "title": "SECoverageInPA",
    "name": "SECoverageInPA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific protected area, get the coverage distribution in that area.</p> <p>The result is the list of cover types with area and percentage inside the specified strategic ecosystem in the protected area category.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified coverage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/se/Páramo/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/states/:state_id/se/:se_type/coverage",
    "title": "SECoverageInState",
    "name": "SECoverageInState",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific state, get the coverage distribution in that area.</p> <p>The result is the list of cover types with area and percentage inside the specified strategic ecosystem in the state.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified coverage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/se/Páramo/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se/:se_type/coverage",
    "title": "SECoverageInSubzone",
    "name": "SECoverageInSubzone",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific basin subzone, get the coverage distribution in that area.</p> <p>The result is the list of cover types with area and percentage inside the specified strategic ecosystem in the basin subzone.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified coverage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/1/se/Páramo/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/states/:state_id/coverage",
    "title": "CoverageInState",
    "name": "StateByCoverage",
    "version": "0.1.0",
    "description": "<p>Separate the state total area by coverage type.</p> <p>The result is the list of cover types with area and percentage inside the state and an extra element with the total state area.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the coverage type respect to the state.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage in the state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/coverage",
    "title": "CoverageInSubzone",
    "name": "SubzoneByCoverage",
    "version": "0.1.0",
    "description": "<p>Separate the basin subzone total area by coverage type.</p> <p>The result is the list of cover types with area and percentage inside the basin subzone and an extra element with the total basin subzone area.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the coverage respect to the subzone.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the coverage area in the subzone</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/1/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_coverages",
    "type": "get",
    "url": "/se/:ecosystem/coverage",
    "title": "CoverageInSE",
    "name": "seByCoverage",
    "version": "0.1.0",
    "description": "<p>Get the strategic ecosystem area separated by coverage</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ecosystem",
            "description": "<p>ecosystem type to get. Accepted values: Páramo, Humedal, Bosque Seco Tropical (results from <a href=\"#api-se-listPrimarySE\">listPrimarySE</a> endpoint)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>coverage information for the ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>coverage percentage for the ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>area for the given coverage inside the strategic ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>coverage type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"N\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"T\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/se/Páramo/coverage",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/strategic_ecosystems.js",
    "groupTitle": "Search > Coverages",
    "groupDescription": "<p>Information related to coverages in a given geofence or in a given strategic ecosystem inside a geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/ea/:ea_id/ecoChange/lp/categories",
    "title": "ForestLPInEA",
    "name": "ForestLPInEA",
    "version": "0.1.0",
    "description": "<p>Values for the forest loss and persistence inside the given environmental authority</p> <p>Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2019 periods</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>list of objects with information about forest LP</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.id",
            "description": "<p>period</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.data",
            "description": "<p>data for forest LP divided by categories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n  \"id\": \"2016-2019\",\n  \"data\": [\n    {\n      \"area\": 50000,\n      \"key\": \"persistencia\",\n      \"percentage\": 0.50\n    },\n     {\n      \"area\": 15000,\n      \"key\": \"perdida\",\n      \"percentage\": 0.15\n    },\n    {\n      \"area\": 25000,\n      \"key\": \"ganancia\",\n      \"percentage\": 0.25\n    },\n    {\n      \"area\": 10000,\n      \"key\": \"no_bosque\",\n      \"percentage\": 0.10\n    }\n  ]\n },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CDMB/ecoChange/lp/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/pa/:category/ecoChange/lp/categories",
    "title": "ForestLPInPA",
    "name": "ForestLPInPA",
    "version": "0.1.0",
    "description": "<p>Values for the forest loss and persistence inside the given protected area category</p> <p>Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2019 periods</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "protected",
            "description": "<p>area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>list of objects with information about forest LP</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.id",
            "description": "<p>period</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.data",
            "description": "<p>data for forest LP divided by categories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n  \"id\": \"2016-2019\",\n  \"data\": [\n    {\n      \"area\": 50000,\n      \"key\": \"persistencia\",\n      \"percentage\": 0.50\n    },\n     {\n      \"area\": 15000,\n      \"key\": \"perdida\",\n      \"percentage\": 0.15\n    },\n    {\n      \"area\": 25000,\n      \"key\": \"ganancia\",\n      \"percentage\": 0.25\n    },\n    {\n      \"area\": 10000,\n      \"key\": \"no_bosque\",\n      \"percentage\": 0.10\n    }\n  ]\n },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/ecoChange/lp/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/states/:state_id/ecoChange/lp/categories",
    "title": "ForestLPInState",
    "name": "ForestLPInState",
    "version": "0.1.0",
    "description": "<p>Values for the forest loss and persistence inside the given basin state</p> <p>Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2019 periods</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>list of objects with information about forest LP</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.id",
            "description": "<p>period</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.data",
            "description": "<p>data for forest LP divided by categories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n  \"id\": \"2016-2019\",\n  \"data\": [\n    {\n      \"area\": 50000,\n      \"key\": \"persistencia\",\n      \"percentage\": 0.50\n    },\n     {\n      \"area\": 15000,\n      \"key\": \"perdida\",\n      \"percentage\": 0.15\n    },\n    {\n      \"area\": 25000,\n      \"key\": \"ganancia\",\n      \"percentage\": 0.25\n    },\n    {\n      \"area\": 10000,\n      \"key\": \"no_bosque\",\n      \"percentage\": 0.10\n    }\n  ]\n },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/86/ecoChange/lp/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/ecoChange/lp/categories",
    "title": "ForestLPInSubzone",
    "name": "ForestLPInSubzone",
    "version": "0.1.0",
    "description": "<p>Values for the forest loss and persistence inside the given basin subzone</p> <p>Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2019 periods</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>list of objects with information about forest LP</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.id",
            "description": "<p>period</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.data",
            "description": "<p>data for forest LP divided by categories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n  \"id\": \"2016-2019\",\n  \"data\": [\n    {\n      \"area\": 50000,\n      \"key\": \"persistencia\",\n      \"percentage\": 0.50\n    },\n     {\n      \"area\": 15000,\n      \"key\": \"perdida\",\n      \"percentage\": 0.15\n    },\n    {\n      \"area\": 25000,\n      \"key\": \"ganancia\",\n      \"percentage\": 0.25\n    },\n    {\n      \"area\": 10000,\n      \"key\": \"no_bosque\",\n      \"percentage\": 0.10\n    }\n  ]\n },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/3701/ecoChange/lp/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/ea/:ea_id/ecoChange/persistence",
    "title": "ForestPersistenceInEA",
    "name": "ForestPersistenceInEA",
    "version": "0.1.0",
    "description": "<p>Value for the forest persistence inside the given environmental authority</p> <p>Value calculated for 2016-2019 period</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>object with forest persistence value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.area",
            "description": "<p>value of forest persistence area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"area\": \"2500\",\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CDMB/ecoChange/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/pa/:category/ecoChange/persistence",
    "title": "ForestPersistenceInPA",
    "name": "ForestPersistenceInPA",
    "version": "0.1.0",
    "description": "<p>Value for the forest persistence inside the given protected area category</p> <p>Value calculated for 2016-2019 period</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "protected",
            "description": "<p>area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>object with forest persistence value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.area",
            "description": "<p>value of forest persistence area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"area\": \"2500\",\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/ecoChange/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/states/:state_id/ecoChange/persistence",
    "title": "ForestPersistenceInState",
    "name": "ForestPersistenceInState",
    "version": "0.1.0",
    "description": "<p>Value for the forest persistence inside the given basin state</p> <p>Value calculated for 2016-2019 period</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>object with forest persistence value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.area",
            "description": "<p>value of forest persistence area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"area\": \"2500\",\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/86/ecoChange/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/ecoChange/persistence",
    "title": "ForestPersistenceInSubzone",
    "name": "ForestPersistenceInSubzone",
    "version": "0.1.0",
    "description": "<p>Value for the forest persistence inside the given basin subzone</p> <p>Value calculated for 2016-2019 period</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>object with forest persistence value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.area",
            "description": "<p>value of forest persistence area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"area\": \"2500\",\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/3701/ecoChange/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/ea/:ea_id/ecoChange/layers/lp/period/:period/categories/",
    "title": "LPCategoriesLayerInEA",
    "name": "LPCategoriesLayerInEA",
    "version": "0.1.0",
    "description": "<p>Get the the forest loss and persistence layer for a given period, divided by categories inside the given environmental authority</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "period",
            "description": "<p>period (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2019)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>the geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"persistencia\",\n             \"area\": 4257.699441612134\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CARDER/ecoChange/layers/lp/period/2016-2019/categories/",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/pa/:category/ecoChange/layers/lp/period/:period/categories/",
    "title": "LPCategoriesLayerInPA",
    "name": "LPCategoriesLayerInPA",
    "version": "0.1.0",
    "description": "<p>Get the the forest loss and persistence layer for a given period, divided by categories inside the protected area category</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "protected",
            "description": "<p>area category</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "period",
            "description": "<p>period (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2019)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>the geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"persistencia\",\n             \"area\": 4257.699441612134\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/ecoChange/layers/lp/period/2016-2019/categories/",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/states/:state_id/ecoChange/layers/lp/period/:period/categories/",
    "title": "LPCategoriesLayerInState",
    "name": "LPCategoriesLayerInState",
    "version": "0.1.0",
    "description": "<p>Get the the forest loss and persistence layer for a given period, divided by categories inside the state</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "period",
            "description": "<p>period (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2019)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>the geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"persistencia\",\n             \"area\": 4257.699441612134\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/86/ecoChange/layers/lp/period/2016-2019/categories/",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_ecoChange",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/ecoChange/layers/lp/period/:period/categories/",
    "title": "LPCategoriesLayerInSubzone",
    "name": "LPCategoriesLayerInSubzone",
    "version": "0.1.0",
    "description": "<p>Get the the forest loss and persistence layer for a given period, divided by categories inside the basin subzone</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "period",
            "description": "<p>period (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2019)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>the geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"persistencia\",\n             \"area\": 4257.699441612134\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/3701/ecoChange/layers/lp/period/2016-2019/categories/",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Forest",
    "groupDescription": "<p>Information related to forest in a given geofence.</p>"
  },
  {
    "group": "s_general_biome",
    "type": "get",
    "url": "/ea/:ea_id/generalBiome",
    "title": "GeneralBiomeInEA",
    "name": "GeneralBiomeInEA",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by general biome (different from IAvH biomes).</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>general biome name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>total area for the associated biome</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"key\": \"Helobioma\",\n    \"area\": 24402.0139\n  },\n  {\n    \"key\": \"Hidrobioma\",\n    \"area\": 20107.551\n  },...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/generalBiome",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > General Biome",
    "groupDescription": "<p>Information related to biomes inside geofences</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/ea/:ea_id/hf/current/categories",
    "title": "CategoriesInEA",
    "name": "CategoriesInEA",
    "version": "0.1.0",
    "description": "<p>Area distribution for each human footprint category in the given environmental authority</p> <p>Values calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>Category identifier (natural, baja, media, alta)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the environmental authority for the category</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified category respect to the environmental authority.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 95976.41220808189,\n    \"key\": \"alta\",\n    \"percentage\": 0.49649477625386373\n  },\n  {\n    \"area\": 36740.71443489614,\n    \"key\": \"baja\",\n    \"percentage\": 0.19006308292929489\n  },\n  {\n    \"area\": 46025.9281542762,\n    \"key\": \"media\",\n    \"percentage\": 0.23809634445690916\n  },\n  {\n    \"area\": 14571.602857381069,\n     \"key\": \"natural\",\n    \"percentage\": 0.07538023701751127\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CRQ/hf/current/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/pa/:category/hf/current/categories",
    "title": "CategoriesInPA",
    "name": "CategoriesInPA",
    "version": "0.1.0",
    "description": "<p>Area distribution for each human footprint category in the given protected area</p> <p>Values calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "protected",
            "description": "<p>area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>Category identifier (natural, baja, media, alta)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the protected area for the category</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified category respect to the protected area.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 95976.41220808189,\n    \"key\": \"alta\",\n    \"percentage\": 0.49649477625386373\n  },\n  {\n    \"area\": 36740.71443489614,\n    \"key\": \"baja\",\n    \"percentage\": 0.19006308292929489\n  },\n  {\n    \"area\": 46025.9281542762,\n    \"key\": \"media\",\n    \"percentage\": 0.23809634445690916\n  },\n  {\n    \"area\": 14571.602857381069,\n     \"key\": \"natural\",\n    \"percentage\": 0.07538023701751127\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/hf/current/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/states/:state_id/hf/current/categories",
    "title": "CategoriesInState",
    "name": "CategoriesInState",
    "version": "0.1.0",
    "description": "<p>Area distribution for each human footprint category in the given state</p> <p>Values calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>Category identifier (natural, baja, media, alta)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the state for the category</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified category respect to the state.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 95976.41220808189,\n    \"key\": \"alta\",\n    \"percentage\": 0.49649477625386373\n  },\n  {\n    \"area\": 36740.71443489614,\n    \"key\": \"baja\",\n    \"percentage\": 0.19006308292929489\n  },\n  {\n    \"area\": 46025.9281542762,\n    \"key\": \"media\",\n    \"percentage\": 0.23809634445690916\n  },\n  {\n    \"area\": 14571.602857381069,\n     \"key\": \"natural\",\n    \"percentage\": 0.07538023701751127\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/hf/current/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/hf/current/categories",
    "title": "CategoriesInSubzone",
    "name": "CategoriesInSubzone",
    "version": "0.1.0",
    "description": "<p>Area distribution for each human footprint category in the given subzone</p> <p>Values calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>Category identifier (natural, baja, media, alta)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the subzone for the category</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified category respect to the subzone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 95976.41220808189,\n    \"key\": \"alta\",\n    \"percentage\": 0.49649477625386373\n  },\n  {\n    \"area\": 36740.71443489614,\n    \"key\": \"baja\",\n    \"percentage\": 0.19006308292929489\n  },\n  {\n    \"area\": 46025.9281542762,\n    \"key\": \"media\",\n    \"percentage\": 0.23809634445690916\n  },\n  {\n    \"area\": 14571.602857381069,\n     \"key\": \"natural\",\n    \"percentage\": 0.07538023701751127\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/2903/hf/current/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/ea/:ea_id/hf/layers/current/categories",
    "title": "CategoriesLayerInEA",
    "name": "CategoriesLayerInEA",
    "version": "0.1.0",
    "description": "<p>Get the current human footprint layer divided by categories in a given environmental authority</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"alta\",\n             \"area\": 4257.699441612134\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/EPA/hf/layers/current/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/pa/:category/hf/layers/current/categories",
    "title": "CategoriesLayerInPA",
    "name": "CategoriesLayerInPA",
    "version": "0.1.0",
    "description": "<p>Get the current human footprint layer divided by categories in a given protected area category</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"alta\",\n             \"area\": 4257.699441612134\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parque Nacional Natural y Parques Naturales Regionales/hf/layers/current/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/states/:state_id/hf/layers/current/categories",
    "title": "CategoriesLayerInState",
    "name": "CategoriesLayerInState",
    "version": "0.1.0",
    "description": "<p>Get the current human footprint layer divided by categories in a given state</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"alta\",\n             \"area\": 4257.699441612134\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/hf/layers/current/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/hf/layers/current/categories",
    "title": "CategoriesLayerInSubzone",
    "name": "CategoriesLayerInSubzone",
    "version": "0.1.0",
    "description": "<p>Get the current human footprint layer divided by categories in a given basin subzone</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"alta\",\n             \"area\": 4257.699441612134\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/2903/hf/layers/current/categories",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/ea/:ea_id/hf/current/value",
    "title": "CurrentValueInEA",
    "name": "CurrentValueInEA",
    "version": "0.1.0",
    "description": "<p>Value and category of the current human footprint inside the given environmental authority</p> <p>Value calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.value",
            "description": "<p>current value of human footprint inside the given environmental authority</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category",
            "description": "<p>category of human footprint inside the given environmental authority</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"value\": \"43.4878396779154589\",\n  \"category\": \"media\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CRQ/hf/current/value",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/pa/:category/hf/current/value",
    "title": "CurrentValueInPA",
    "name": "CurrentValueInPA",
    "version": "0.1.0",
    "description": "<p>Value and category of the current value of human footprint inside the given protected area</p> <p>Value calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "protected",
            "description": "<p>area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.value",
            "description": "<p>current value of human footprint inside the given protected area</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category",
            "description": "<p>category of human footprint inside the given protected area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"value\": \"43.4878396779154589\",\n  \"category\": \"media\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/hf/current/value",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/states/:state_id/hf/current/value",
    "title": "CurrentValueInState",
    "name": "CurrentValueInState",
    "version": "0.1.0",
    "description": "<p>Value and category of the current value of human footprint inside the given state</p> <p>Value calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.value",
            "description": "<p>current value of human footprint inside the given state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category",
            "description": "<p>category of human footprint inside the given state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"value\": \"43.4878396779154589\",\n  \"category\": \"media\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/hf/current/value",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/hf/current/value",
    "title": "CurrentValueInSubzone",
    "name": "CurrentValueInSubzone",
    "version": "0.1.0",
    "description": "<p>Value and category of the current value of human footprint inside the given basin subzone</p> <p>Value calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.value",
            "description": "<p>current value of human footprint inside the given basin subzone</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category",
            "description": "<p>category of human footprint inside the given basin subzone</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"value\": \"43.4878396779154589\",\n  \"category\": \"media\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/2903/hf/current/value",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/ea/:ea_id/hf/persistence",
    "title": "PersistenceInEA",
    "name": "HFPersistenceInEA",
    "version": "0.1.0",
    "description": "<p>List the persistence of human footprint inside the given environmental authority.</p> <p>Values calculated between 1970 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>Persistence identifier (estable_natural, dinamica, estable_alta)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the environmental authority for the persistence value</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified persistence value respect to the environmental authority.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 19422.0899745865,\n    \"percentage\": 0.100904866408734,\n    \"key\": \"estable_natural\"\n  },\n  {\n    \"area\": 163338.479965581,\n    \"percentage\": 0.84860319,\n    \"key\": \"dinamica\"\n  },\n  {\n    \"area\": 9718.65000066086,\n    \"percentage\": 0.050491944032445,\n    \"key\": \"estable_alta\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CRQ/hf/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/pa/:category/hf/persistence",
    "title": "PersistenceInPA",
    "name": "HFPersistenceInPA",
    "version": "0.1.0",
    "description": "<p>List the persistence of human footprint inside the given protected area category.</p> <p>Values calculated between 1970 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>Persistence identifier (estable_natural, dinamica, estable_alta)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the state for the persistence value</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified persistence value respect to the category.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 19422.0899745865,\n    \"percentage\": 0.100904866408734,\n    \"key\": \"estable_natural\"\n  },\n  {\n    \"area\": 163338.479965581,\n    \"percentage\": 0.84860319,\n    \"key\": \"dinamica\"\n  },\n  {\n    \"area\": 9718.65000066086,\n    \"percentage\": 0.050491944032445,\n    \"key\": \"estable_alta\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/hf/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/states/:state_id/hf/persistence",
    "title": "PersistenceInState",
    "name": "HFPersistenceInState",
    "version": "0.1.0",
    "description": "<p>List the persistence of human footprint inside the given state.</p> <p>Values calculated between 1970 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>Persistence identifier (estable_natural, dinamica, estable_alta)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the state for the persistence value</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified persistence value respect to the state.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 19422.0899745865,\n    \"percentage\": 0.100904866408734,\n    \"key\": \"estable_natural\"\n  },\n  {\n    \"area\": 163338.479965581,\n    \"percentage\": 0.84860319,\n    \"key\": \"dinamica\"\n  },\n  {\n    \"area\": 9718.65000066086,\n    \"percentage\": 0.050491944032445,\n    \"key\": \"estable_alta\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/hf/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/hf/persistence",
    "title": "PersistenceInSubzone",
    "name": "HFPersistenceInSubzone",
    "version": "0.1.0",
    "description": "<p>List the persistence of human footprint inside the given basin subzone.</p> <p>Values calculated between 1970 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>Persistence identifier (estable_natural, dinamica, estable_alta)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the basin subzone for the persistence value</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified persistence value respect to the basin subzone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 19422.0899745865,\n    \"percentage\": 0.100904866408734,\n    \"key\": \"estable_natural\"\n  },\n  {\n    \"area\": 163338.479965581,\n    \"percentage\": 0.84860319,\n    \"key\": \"dinamica\"\n  },\n  {\n    \"area\": 9718.65000066086,\n    \"percentage\": 0.050491944032445,\n    \"key\": \"estable_alta\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/1/hf/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/ea/:ea_id/hf/layers/persistence",
    "title": "PersistenceLayerInEA",
    "name": "PersistenceLayerInEA",
    "version": "0.1.0",
    "description": "<p>Get the persistence human footprint layer divided by categories in a given environmental authority</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"estable_natural\",\n             \"area\": 10426.840971699932\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/EPA/hf/layers/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/pa/:category/hf/layers/persistence",
    "title": "PersistenceLayerInPA",
    "name": "PersistenceLayerInPA",
    "version": "0.1.0",
    "description": "<p>Get the persistence human footprint layer divided by categories in a given protected area category</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"estable_natural\",\n             \"area\": 10426.840971699932\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parque Nacional Natural y Parques Naturales Regionales/hf/layers/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/states/:state_id/hf/layers/persistence",
    "title": "PersistenceLayerInState",
    "name": "PersistenceLayerInState",
    "version": "0.1.0",
    "description": "<p>Get the persistence human footprint layer divided by categories in a given state</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"estable_natural\",\n             \"area\": 10426.840971699932\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/hf/layers/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/hf/layers/persistence",
    "title": "PersistenceLayerInSubzone",
    "name": "PersistenceLayerInSubzone",
    "version": "0.1.0",
    "description": "<p>Get the persistence human footprint layer divided by categories in a given basin subzone</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n         {\n          \"type\": \"Feature\",\n          \"properties\": {\n             \"key\": \"estable_natural\",\n             \"area\": 10426.840971699932\n         },\n         \"geometry\": {\n              \"type\": \"GeometryCollection\",\n              \"geometries\": [\n                  {\n                  \"type\": \"Polygon\",\n                  \"coordinates\": [\n                      [\n                          [\n                              -75.5104086779181,\n                              10.4307384992824\n                          ],\n                      ]\n                  }\n              ]\n          },\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/2903/hf/layers/persistence",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/ea/:ea_id/se/:se_type/hf/timeline",
    "title": "SETimeLineInEA",
    "name": "SETimeLineInEA",
    "version": "0.1.0",
    "description": "<p>Values for the human footprint through time for a strategic ecosystem inside the given environmental authority</p> <p>Values calculated for 1970, 1990, 2000, 2015 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>key that identifies strategic ecosystem type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.data",
            "description": "<p>values x (year) and y (hf value)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"key\": \"paramo\"\n  \"data\": [\n    {\n      \"x\": \"1970\",\n      \"y\": 34.71575965882226,\n    },\n    {\n      \"x\": \"1990\",\n      \"y\": 40.211355678553204,\n    },\n    {\n      \"x\": \"2000\",\n      \"y\": 41.50084127642091,\n    },\n    {\n      \"x\": \"2015\",\n      \"y\": 42.89788123876601,\n    },\n    {\n      \"x\": \"2018\",\n      \"y\": 43.48783967791546,\n    },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CDMB/se/Páramo/hf/timeline",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/pa/:category/:se_type/hf/timeline",
    "title": "SETimeLineInPA",
    "name": "SETimeLineInPA",
    "version": "0.1.0",
    "description": "<p>Values for the human footprint through time for a strategic ecosystem inside the given protected area category</p> <p>Values calculated for 1970, 1990, 2000, 2015 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>key that identifies strategic ecosystem type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.data",
            "description": "<p>values x (year) and y (hf value)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"key\": \"paramo\"\n  \"data\": [\n    {\n      \"x\": \"1970\",\n      \"y\": 34.71575965882226,\n    },\n    {\n      \"x\": \"1990\",\n      \"y\": 40.211355678553204,\n    },\n    {\n      \"x\": \"2000\",\n      \"y\": 41.50084127642091,\n    },\n    {\n      \"x\": \"2015\",\n      \"y\": 42.89788123876601,\n    },\n    {\n      \"x\": \"2018\",\n      \"y\": 43.48783967791546,\n    },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/se/Páramo/hf/timeline",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/states/:state_id/se/:se_type/hf/timeline",
    "title": "SETimeLineInState",
    "name": "SETimeLineInState",
    "version": "0.1.0",
    "description": "<p>Values for the human footprint through time for a strategic ecosystem inside the given state</p> <p>Values calculated for 1970, 1990, 2000, 2015 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>key that identifies strategic ecosystem type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.data",
            "description": "<p>values x (year) and y (hf value)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"key\": \"paramo\"\n  \"data\": [\n    {\n      \"x\": \"1970\",\n      \"y\": 34.71575965882226,\n    },\n    {\n      \"x\": \"1990\",\n      \"y\": 40.211355678553204,\n    },\n    {\n      \"x\": \"2000\",\n      \"y\": 41.50084127642091,\n    },\n    {\n      \"x\": \"2015\",\n      \"y\": 42.89788123876601,\n    },\n    {\n      \"x\": \"2018\",\n      \"y\": 43.48783967791546,\n    },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/se/Páramo/hf/timeline",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se/:se_type/hf/timeline",
    "title": "SETimeLineInSubzone",
    "name": "SETimeLineInSubzone",
    "version": "0.1.0",
    "description": "<p>Values for the human footprint through time for a strategic ecosystem inside the given basin subzone</p> <p>Values calculated for 1970, 1990, 2000, 2015 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>key that identifies strategic ecosystem type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.data",
            "description": "<p>values x (year) and y (hf value)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"key\": \"paramo\"\n  \"data\": [\n    {\n      \"x\": \"1970\",\n      \"y\": 34.71575965882226,\n    },\n    {\n      \"x\": \"1990\",\n      \"y\": 40.211355678553204,\n    },\n    {\n      \"x\": \"2000\",\n      \"y\": 41.50084127642091,\n    },\n    {\n      \"x\": \"2015\",\n      \"y\": 42.89788123876601,\n    },\n    {\n      \"x\": \"2018\",\n      \"y\": 43.48783967791546,\n    },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/3701/se/Páramo/hf/timeline",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/ea/:ea_id/hf/timeline",
    "title": "TimeLineInEA",
    "name": "TimeLineInEA",
    "version": "0.1.0",
    "description": "<p>Values for the human footprint through time inside the given environmental authority</p> <p>Values calculated for 1970, 1990, 2000, 2015 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>aTotal that identifies total values for geofence</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.data",
            "description": "<p>values x (year) and y (hf value)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"key\": \"aTotal\"\n  \"data\": [\n    {\n      \"x\": \"1970\",\n      \"y\": 34.71575965882226,\n    },\n    {\n      \"x\": \"1990\",\n      \"y\": 40.211355678553204,\n    },\n    {\n      \"x\": \"2000\",\n      \"y\": 41.50084127642091,\n    },\n    {\n      \"x\": \"2015\",\n      \"y\": 42.89788123876601,\n    },\n    {\n      \"x\": \"2018\",\n      \"y\": 43.48783967791546,\n    },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CDMB/hf/timeline",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/pa/:category/hf/timeline",
    "title": "TimeLineInPA",
    "name": "TimeLineInPA",
    "version": "0.1.0",
    "description": "<p>Values for the human footprint through time inside the given protected area category.</p> <p>Values calculated for 1970, 1990, 2000, 2015 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>aTotal that identifies total values for geofence</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.data",
            "description": "<p>values x (year) and y (hf value)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"key\": \"aTotal\"\n  \"data\": [\n    {\n      \"x\": \"1970\",\n      \"y\": 34.71575965882226,\n    },\n    {\n      \"x\": \"1990\",\n      \"y\": 40.211355678553204,\n    },\n    {\n      \"x\": \"2000\",\n      \"y\": 41.50084127642091,\n    },\n    {\n      \"x\": \"2015\",\n      \"y\": 42.89788123876601,\n    },\n    {\n      \"x\": \"2018\",\n      \"y\": 43.48783967791546,\n    },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/hf/timeline",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/states/:state_id/hf/timeline",
    "title": "TimeLineInState",
    "name": "TimeLineInState",
    "version": "0.1.0",
    "description": "<p>Values for the human footprint through time inside the given state</p> <p>Values calculated for 1970, 1990, 2000, 2015 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>aTotal that identifies total values for geofence</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.data",
            "description": "<p>values x (year) and y (hf value)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"key\": \"aTotal\"\n  \"data\": [\n    {\n      \"x\": \"1970\",\n      \"y\": 34.71575965882226,\n    },\n    {\n      \"x\": \"1990\",\n      \"y\": 40.211355678553204,\n    },\n    {\n      \"x\": \"2000\",\n      \"y\": 41.50084127642091,\n    },\n    {\n      \"x\": \"2015\",\n      \"y\": 42.89788123876601,\n    },\n    {\n      \"x\": \"2018\",\n      \"y\": 43.48783967791546,\n    },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/hf/timeline",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_hf",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/hf/timeline",
    "title": "TimeLineInSubzone",
    "name": "TimeLineInSubzone",
    "version": "0.1.0",
    "description": "<p>Values for the human footprint through time inside the given basin subzone</p> <p>Values calculated for 1970, 1990, 2000, 2015 and 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.key",
            "description": "<p>aTotal that identifies total values for geofence</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.data",
            "description": "<p>values x (year) and y (hf value)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"key\": \"aTotal\"\n  \"data\": [\n    {\n      \"x\": \"1970\",\n      \"y\": 34.71575965882226,\n    },\n    {\n      \"x\": \"1990\",\n      \"y\": 40.211355678553204,\n    },\n    {\n      \"x\": \"2000\",\n      \"y\": 41.50084127642091,\n    },\n    {\n      \"x\": \"2015\",\n      \"y\": 42.89788123876601,\n    },\n    {\n      \"x\": \"2018\",\n      \"y\": 43.48783967791546,\n    },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/2903/hf/timeline",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Human Footprint",
    "groupDescription": "<p>Information related to human footprint in a given geofence.</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/ea/:ea_id/pa",
    "title": "PAInEA",
    "name": "EAByPA",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by protected areas.</p> <p>The result is the list of protected area types with area and percentage inside the environmental authority and two extra elements: the total protected area inside the environmental authority and the non protected area</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the protected area</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified PA respect to the EA area.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified protected area in the environmental authority</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 68695,\n    \"percentage\": 0.11579025436941971,\n    \"type\": \"Total\"\n  },\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  },\n  {\n    \"area\": \"241.9864414835\",\n    \"type\": \"No Protegida\",\n    \"percentage\": 0.33981634981401826\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/pa/:category/pa",
    "title": "PAInPA",
    "name": "PAByPA",
    "version": "0.1.0",
    "description": "<p>Separate the protected area by protected areas.</p> <p>The result is the list of protected area types with area and percentage inside the protected area category and one extra elementwith the total protected area inside the protected area category.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the protected area</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified PA</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified protected area in the protected area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 108607,\n    \"percentage\": 1,\n    \"type\": \"Total\"\n  },\n  {\n    \"percentage\": 0,\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 1,\n    \"type\": \"Parques Naturales Regionales\"\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/ea/:ea_id/se/:se_type/pa",
    "title": "SEPAInEA",
    "name": "SEPAInEA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific environmental authority, get the distribution of protected area categories in that area.</p> <p>The result is the list of protected area types with area and percentage inside the specified strategic ecosystem in the environmental authority and two extra elements: the total protected area inside the specified area and the non protected area.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the protected area type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified protected area</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified protected area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 68695,\n    \"percentage\": 0.11579025436941971,\n    \"type\": \"Total\"\n  },\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  },\n  {\n    \"area\": \"241.9864414835\",\n    \"type\": \"No Protegida\",\n    \"percentage\": 0.33981634981401826\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/se/Páramo/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/pa/:category/se/:se_type/pa",
    "title": "SEPAInPA",
    "name": "SEPAInPA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific protected area, get the protected area categories distribution in that area.</p> <p>The result is the list of protected area types with area and percentage inside the specified strategic ecosystem in the protected area category.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified coverage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"percentage\": 1,\n    \"area\": \"305237.610769660272561\",\n    \"type\": Parques Naturales Regionales\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/se/Páramo/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/states/:state_id/se/:se_type/pa",
    "title": "SEPAInState",
    "name": "SEPAInState",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific state, get the protected area categories distribution in that area.</p> <p>The result is the list of protected area types with area and percentage inside the specified strategic ecosystem in the state and one extra element with the total protected area inside the specified state.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified coverage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 68695,\n    \"percentage\": 0.11579025436941971,\n    \"type\": \"Total\"\n  },\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  },\n  {\n    \"area\": \"241.9864414835\",\n    \"type\": \"No Protegida\",\n    \"percentage\": 0.33981634981401826\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/se/Páramo/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se/:se_type/pa",
    "title": "SEPAInSubzone",
    "name": "SEPAInSubzone",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific basin subzone, get the protected area categories distribution in that area.</p> <p>The result is the list of protected area types with area and percentage inside the specified strategic ecosystem in the basin subzone and one extra object for non protected area info.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the coverage type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified coverage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified coverage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 68695,\n    \"percentage\": 0.11579025436941971,\n    \"type\": \"Total\"\n  },\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  },\n  {\n    \"area\": \"241.9864414835\",\n    \"type\": \"No Protegida\",\n    \"percentage\": 0.33981634981401826\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/1/se/Páramo/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/states/:state_id/pa",
    "title": "PAInState",
    "name": "StateByPA",
    "version": "0.1.0",
    "description": "<p>Separate the state total area by protected areas.</p> <p>The result is the list of protected area types with area and percentage inside the state and one extra element with the total protected area inside the state.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the protected area</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified PA respect to the state area</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified protected area in the state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 68695,\n    \"percentage\": 0.11579025436941971,\n    \"type\": \"Total\"\n  },\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  },\n  {\n    \"area\": \"241.9864414835\",\n    \"type\": \"No Protegida\",\n    \"percentage\": 0.33981634981401826\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/pa",
    "title": "PaInSubzone",
    "name": "SubzoneByPA",
    "version": "0.1.0",
    "description": "<p>Separate the basin subzone total area by protected area types.</p> <p>The result is the list of protected area types with area and percentage inside the basin subzone and two extra elements: the total protected area inside the basin subzone and the non protected area</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the protected area type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified PA respect to the subzone.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified protected area in the subzone</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 68695,\n    \"percentage\": 0.11579025436941971,\n    \"type\": \"Total\"\n  },\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  },\n  {\n    \"area\": \"241.9864414835\",\n    \"type\": \"No Protegida\",\n    \"percentage\": 0.33981634981401826\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/1/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_protected_areas",
    "type": "get",
    "url": "/se/:ecosystem/pa",
    "title": "PAInSE",
    "name": "seByPA",
    "version": "0.1.0",
    "description": "<p>Get the strategic ecosystem area separated by protected areas</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ecosystem",
            "description": "<p>ecosystem type to get. Accepted values: Páramo, Humedal, Bosque Seco Tropical (results from <a href=\"#api-se-listPrimarySE\">listPrimarySE</a> endpoint)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>information about protected areas for the ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>protected area percentage for the ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>area for the protected area inside the strategic ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>protected area type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"area\": 68695,\n    \"percentage\": 0.11579025436941971,\n    \"type\": \"Total\"\n  },\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  },\n  {\n    \"area\": \"241.9864414835\",\n    \"type\": \"No Protegida\",\n    \"percentage\": 0.33981634981401826\n  }...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/se/Páramo/pa",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/strategic_ecosystems.js",
    "groupTitle": "Search > Protected Areas",
    "groupDescription": "<p>Information related to protected areas inside geofences and in strategic ecosystems inside geofences</p>"
  },
  {
    "group": "s_sci_hf",
    "type": "get",
    "url": "/sci/hf",
    "title": "SCIHF",
    "name": "SCIHF",
    "version": "1.0.0",
    "description": "<p>Values for the forest structural condition index crossed with human footprint and protected area categories for a given area</p> <p>Value calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Query params": [
          {
            "group": "Query params",
            "type": "String|Number",
            "optional": false,
            "field": "areaType",
            "description": "<p>area type</p>"
          },
          {
            "group": "Query params",
            "type": "String",
            "optional": false,
            "field": "areaId",
            "description": "<p>area id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.hf_pers",
            "description": "<p>Persistence category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.sci_cat",
            "description": "<p>SCI categoy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.pa",
            "description": "<p>Protected area category name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area inside the given area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"hf_pers\": \"estable_alta\",\n    \"sci_cat\": \"alta\",\n    \"pa\": \"PNN\",\n    \"area\": 101834\n  },\n  {\n    \"hf_pers\": \"estable_alta\",\n    \"sci_cat\": \"alta\",\n    \"pa\": \"PNR\",\n    \"area\": 134886\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/sci/hf?areaType=ea&areaId=DAGMA",
        "type": "curl"
      }
    ],
    "filename": "services/forest/src/route/SCIHF.js",
    "groupTitle": "Search > Forest Structural Condition Index",
    "groupDescription": "<p>Information related to the forest structural condition index in a given area.</p>"
  },
  {
    "group": "s_sci_hf",
    "type": "get",
    "url": "/sci/hf/layer",
    "title": "SCIHFLayer",
    "name": "SCIHFLayer",
    "version": "1.0.0",
    "description": "<p>Layer of the forest structural condition index crossed with human footprint for a given area</p> <p>Value calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Query params": [
          {
            "group": "Query params",
            "type": "String|Number",
            "optional": false,
            "field": "areaType",
            "description": "<p>area type</p>"
          },
          {
            "group": "Query params",
            "type": "String",
            "optional": false,
            "field": "areaId",
            "description": "<p>area id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"sci_cat\": \"baja_moderada\",\n        \"hf_pers\": \"estable_alta\"\n      },\n      \"geometry\": {\n        \"geometries\": [\n          {\n            \"type\": \"MultiPolygon\",\n            \"coordinates\": [\n              [\n                [\n                  [\n                    -75.9355268362944,\n                    4.80674184545984\n                  ],\n                  ...\n                ]\n              ]\n            ]\n          }\n        ]\n      }\n    },\n    ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/sci/hf/layer?areaType=ea&areaId=DAGMA",
        "type": "curl"
      }
    ],
    "filename": "services/forest/src/route/SCIHF.js",
    "groupTitle": "Search > Forest Structural Condition Index",
    "groupDescription": "<p>Information related to the forest structural condition index in a given area.</p>"
  },
  {
    "group": "s_sci_hf",
    "type": "get",
    "url": "/sci/:sci_cat/hf/:hf_pers/layer",
    "title": "SCIHFPALayer",
    "name": "SCIHFPALayer",
    "version": "1.0.0",
    "description": "<p>Layer of one combination of forest structural condition index category and a human footprint persistence category, divided by protected areas for a given area</p> <p>Value calculated for 2018</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "sciCat",
            "description": "<p>sci category</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "hfPers",
            "description": "<p>human footprint persistence category</p>"
          }
        ],
        "Query params": [
          {
            "group": "Query params",
            "type": "String|Number",
            "optional": false,
            "field": "areaType",
            "description": "<p>area type</p>"
          },
          {
            "group": "Query params",
            "type": "String",
            "optional": false,
            "field": "areaId",
            "description": "<p>area id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (type, properties, geometry)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"pa_label\": \"Distritos Regionales de Manejo Integrado\"\n      },\n      \"geometry\": {\n        \"type\": \"MultiPolygon\",\n        \"coordinates\": [\n          [\n            [\n              [\n                -76.0875466650366,\n                5.04537111840702\n              ],\n              [\n                -76.0804526759551,\n                5.04806343034337\n              ]...\n            ]\n          ]\n        ]\n      }\n    },\n    ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/sci/baja_moderada/hf/estable_alta/layer?areaType=ea&areaId=DAGMA",
        "type": "curl"
      }
    ],
    "filename": "services/forest/src/route/SCIHF.js",
    "groupTitle": "Search > Forest Structural Condition Index",
    "groupDescription": "<p>Information related to the forest structural condition index in a given area.</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/ea/:ea_id/se",
    "title": "SEInEA",
    "name": "EABySE",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by strategic ecosystems.</p> <p>The result is the list of strategic ecosystems with area and percentage inside the environmental authority and an extra element with the total area inside strategic ecosystems on the environmental authority.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the strategic ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified SE in the EA</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified SE respect to the EA area.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n   {\n    \"area\": 134079.17569578788,\n    \"percentage\": 0.4191585381124241,\n    \"type\": \"Total\"\n  },\n  {\n    \"area\": 284538.960066167,\n    \"percentage\": 0.4318134185,\n    \"type\": \"Humedal\"\n  },\n  {\n    \"area\": 166148.838843223,\n    \"percentage\": 0.2521457802,\n    \"type\": \"Páramo\"\n  },\n  {\n    \"area\": 208251.798376851,\n    \"percentage\": 0.3160408014,\n    \"type\": \"Bosque Seco Tropical\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/se",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/pa/:category/se",
    "title": "SEInPA",
    "name": "PABySE",
    "version": "0.1.0",
    "description": "<p>Separate the protected area by strategic ecosystems.</p> <p>The result is the list of strategic ecosystems with area and percentage inside the protected area category and one extra element with the total area inside strategic ecosystems on the protected area category.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the strategic ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified SE in the protected area</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the SE respect to the protected area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n   {\n    \"area\": 134079.17569578788,\n    \"percentage\": 0.4191585381124241,\n    \"type\": \"Total\"\n  },\n  {\n    \"area\": 284538.960066167,\n    \"percentage\": 0.4318134185,\n    \"type\": \"Humedal\"\n  },\n  {\n    \"area\": 166148.838843223,\n    \"percentage\": 0.2521457802,\n    \"type\": \"Páramo\"\n  },\n  {\n    \"area\": 208251.798376851,\n    \"percentage\": 0.3160408014,\n    \"type\": \"Bosque Seco Tropical\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/se",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/ea/:ea_id/se/:se_type",
    "title": "SEDetailInEA",
    "name": "SEDetailInEA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific environmental authority, get more details about that area, for the moment is just the national percentage of that strategic ecosystem</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.national_percentage",
            "description": "<p>strategic ecosystem inside environmental authority percentage with respect to the national area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"national_percentage\": 0.1523\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CORPOBOYACA/se/Páramo",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/pa/:category/se/:se_type",
    "title": "SEDetailInPA",
    "name": "SEDetailInPA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific protected area, get more details about that area, for the moment is just the national percentage of that strategic ecosystem</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.national_percentage",
            "description": "<p>strategic ecosystem inside protected area percentage with respect to the national area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"national_percentage\": 0.1523\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parques Naturales Regionales/se/Páramo",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/states/:state_id/se/:se_type",
    "title": "SEDetailInState",
    "name": "SEDetailInState",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific state, get more details about that area, for the moment is just the national percentage of that strategic ecosystem</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.national_percentage",
            "description": "<p>strategic ecosystem inside state percentage with respect to the national area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"national_percentage\": 0.1523\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/se/Páramo",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se/:se_type",
    "title": "SEDetailInSubzone",
    "name": "SEDetailInSubzone",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific basin subzone, get more details about that area, for the moment is just the national percentage of that strategic ecosystem</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.national_percentage",
            "description": "<p>percentage of the strategic ecosystem inside basin subzone respect to the national area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"national_percentage\": 0.1523\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/1/se/Páramo",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/ea/:ea_id/se/layers/:se_type",
    "title": "SEInEALayer",
    "name": "SEInEALayer",
    "version": "0.1.0",
    "description": "<p>Get the layer for an specific strategic ecosystem inside an environmental authority</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>state id.</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Array[]",
            "optional": false,
            "field": "result.coordinates",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"id\": 269,\n        \"key\": \"Río Guayuriba\"\n      },\n      \"geometry\": {\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              -73.8291702258294,\n              4.75750017293779\n            ],\n            ...\n          ]\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ea/CRQ/se/layers/Páramo",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/environmental_authorities.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/pa/:category/se/layers/:se_type",
    "title": "SEInPALayer",
    "name": "SEInPALayer",
    "version": "0.1.0",
    "description": "<p>Get the layer for an specific strategic ecosystem inside a protected area category</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category.</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Array[]",
            "optional": false,
            "field": "result.coordinates",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"id\": 269,\n        \"key\": \"Río Guayuriba\"\n      },\n      \"geometry\": {\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              -73.8291702258294,\n              4.75750017293779\n            ],\n            ...\n          ]\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/Parque Nacional Natural/se/layers/Páramo",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/protected_areas.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/states/:state_id/se/layers/:se_type",
    "title": "SEInStateLayer",
    "name": "SEInStateLayer",
    "version": "0.1.0",
    "description": "<p>Get the layer for an specific strategic ecosystem inside an state</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id.</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Array[]",
            "optional": false,
            "field": "result.coordinates",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"id\": 269,\n        \"key\": \"Río Guayuriba\"\n      },\n      \"geometry\": {\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              -73.8291702258294,\n              4.75750017293779\n            ],\n            ...\n          ]\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/se/layers/Páramo",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se/layers/:se_type",
    "title": "SEInSubzoneLayer",
    "name": "SEInSubzoneLayer",
    "version": "0.1.0",
    "description": "<p>Get the layer for an specific strategic ecosystem inside a basin subzone</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>subzone id.</p>"
          },
          {
            "group": "Path params",
            "type": "String",
            "optional": false,
            "field": "se_type",
            "description": "<p>strategic ecosystem type.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200: GeoJson object": [
          {
            "group": "geojson",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "geojson",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "geojson",
            "type": "Array[]",
            "optional": false,
            "field": "result.coordinates",
            "description": "<p>Coordinate Reference Systems specification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n    {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"id\": 269,\n        \"key\": \"Río Guayuriba\"\n      },\n      \"geometry\": {\n        \"type\": \"Polygon\",\n        \"coordinates\": [\n          [\n            [\n              -73.8291702258294,\n              4.75750017293779\n            ],\n            ...\n          ]\n        ]\n      }\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/3502/se/layers/Páramo",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/states/:state_id/se",
    "title": "SEInState",
    "name": "StateBySE",
    "version": "0.1.0",
    "description": "<p>Separate the state total area by strategic ecosystems.</p> <p>The result is the list of strategic ecosystems with area and percentage inside the state and an extra element with the total area inside strategic ecosystems on the state.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the strategic ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified SE in the state</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified SE respect to the state area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n   {\n    \"area\": 134079.17569578788,\n    \"percentage\": 0.4191585381124241,\n    \"type\": \"Total\"\n  },\n  {\n    \"area\": 284538.960066167,\n    \"percentage\": 0.4318134185,\n    \"type\": \"Humedal\"\n  },\n  {\n    \"area\": 166148.838843223,\n    \"percentage\": 0.2521457802,\n    \"type\": \"Páramo\"\n  },\n  {\n    \"area\": 208251.798376851,\n    \"percentage\": 0.3160408014,\n    \"type\": \"Bosque Seco Tropical\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/states/44/se",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/states.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "s_strategic_ecosystems",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se",
    "title": "SEInSubzone",
    "name": "SubzoneBySE",
    "version": "0.1.0",
    "description": "<p>Separate the basin subzone total area by strategic ecosystems.</p> <p>The result is the list of strategic ecosystems with area and percentage inside the basin subzone and an extra element with the total area inside strategic ecosystems on the basin subzone.</p>",
    "parameter": {
      "fields": {
        "Path params": [
          {
            "group": "Path params",
            "type": "Number",
            "optional": false,
            "field": "subzone_id",
            "description": "<p>basin subzone id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.type",
            "description": "<p>Specifies the strategic ecosystem</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>Area of the specified SE in the subzone</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.percentage",
            "description": "<p>Percentage of the specified SE respect to the subzone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n   {\n    \"area\": 134079.17569578788,\n    \"percentage\": 0.4191585381124241,\n    \"type\": \"Total\"\n  },\n  {\n    \"area\": 284538.960066167,\n    \"percentage\": 0.4318134185,\n    \"type\": \"Humedal\"\n  },\n  {\n    \"area\": 166148.838843223,\n    \"percentage\": 0.2521457802,\n    \"type\": \"Páramo\"\n  },\n  {\n    \"area\": 208251.798376851,\n    \"percentage\": 0.3160408014,\n    \"type\": \"Bosque Seco Tropical\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/basinSubzones/1/se",
        "type": "curl"
      }
    ],
    "filename": "services/backend/src/routes/basin_subzones.js",
    "groupTitle": "Search > Strategic Ecosystems",
    "groupDescription": "<p>Information related explicitly to strategic ecosystems like total area or percentage in a geofence or in relation with the national total (not coverages or protected areas)</p>"
  },
  {
    "group": "users",
    "type": "post",
    "url": "/users/login",
    "title": "loginUser",
    "name": "loginUser",
    "version": "0.1.0",
    "description": "<p>Authenticate a user. Properties of the returned object varies, since these are defined in the configuration file, but it includes at least username.</p>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>user username</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"test\",\n  \"password\": \"testPass12\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>authenticated user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user.username",
            "description": "<p>authenticated username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n  \"username\": \"test\",\n  \"name\": \"Test user\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/users/login",
        "type": "bash"
      }
    ],
    "filename": "services/backend/src/routes/users.js",
    "groupTitle": "Users",
    "groupDescription": "<p>Endpoint for actions on users</p>"
  }
] });
