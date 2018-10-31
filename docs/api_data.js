define({ "api": [
  {
    "group": "biomes",
    "type": "get",
    "url": "/biomes",
    "title": "getAllBiomes",
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
    "filename": "src/routes/biomes.js",
    "groupTitle": "Biomes",
    "groupDescription": "<p>Endpoints related with queries about biomes</p>"
  },
  {
    "group": "biomes",
    "type": "get",
    "url": "/biomes/ea/:ea_name",
    "title": "getBiomesByEA",
    "name": "getBiomesByEA",
    "version": "0.1.0",
    "description": "<p>Find all biomes that belong to the given environmental authority.</p> <p><strong>Some of the response properties are TopoJson / GeoJson standard properties, so they are not described here.</strong></p>",
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
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topo",
            "description": "<p>TopoJson object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topo.objects.ea",
            "description": "<p>GeometryCollection with biomes information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "topo.objects.ea.geometries",
            "description": "<p>biome object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topo.objects.ea.geometries.properties",
            "description": "<p>biome properties besides geometry.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topo.objects.ea.geometries.properties.id_ea",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topo.objects.ea.geometries.properties.name_biome",
            "description": "<p>biome name</p>"
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
        "content": "/biomes/ea/CORPOBOYACA",
        "type": "curl"
      }
    ],
    "filename": "src/routes/biomes.js",
    "groupTitle": "Biomes",
    "groupDescription": "<p>Endpoints related with queries about biomes</p>"
  },
  {
    "group": "companiesProjectsStrategies",
    "type": "post",
    "url": "/companies/:id_company/projects/:id_project/strategies",
    "title": "createProjectStrategy",
    "name": "createProjectStrategy",
    "version": "0.1.0",
    "description": "<p>Create a new strategy as part of the selected strategies of the given project</p>",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "query",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project associated with this strategy</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "Object",
            "optional": false,
            "field": "strategy",
            "description": "<p>strategy to be created</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_biome",
            "description": "<p>biome to associate with the strategy</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "strategy.id_ea",
            "description": "<p>environmental authority to associate with the strategy</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_subzone",
            "description": "<p>'subzona hidrográfica' to associate with the strategy</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_strategy",
            "description": "<p>strategy to associate with</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "strategy.area",
            "description": "<p>area (in ha) included with this strategy</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "strategy.id_user",
            "description": "<p>user that created the strategy</p>"
          },
          {
            "group": "body",
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
    "filename": "src/routes/project_strategies.js",
    "groupTitle": "Companies/Projects/Strategies",
    "groupDescription": "<p>Queries and actions directly related with projects strategies selected inside a project</p>"
  },
  {
    "group": "companiesProjectsStrategies",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project/strategies/download",
    "title": "downloadSelectedStrategies",
    "name": "downloadSelectedStrategies",
    "version": "0.1.0",
    "description": "<p>Generate a GeoJson file that includes all selected strategies information for a given project</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/project_strategies.js",
    "groupTitle": "Companies/Projects/Strategies",
    "groupDescription": "<p>Queries and actions directly related with projects strategies selected inside a project</p>"
  },
  {
    "group": "companiesProjectsStrategies",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project/strategies",
    "title": "listProjectStrategies",
    "name": "listProjectStrategies",
    "version": "0.1.0",
    "description": "<p>List all saved (selected) strategies associated with the given project</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/project_strategies.js",
    "groupTitle": "Companies/Projects/Strategies",
    "groupDescription": "<p>Queries and actions directly related with projects strategies selected inside a project</p>"
  },
  {
    "group": "companiesProjects",
    "type": "post",
    "url": "/companies/:id_company/projects/:id_project/biomes",
    "title": "addImpactedBiomes",
    "name": "addImpactedBiomes",
    "version": "0.1.0",
    "description": "<p>Associate a set of biomes as impacted by a given project. This automatically updates the associated project total area</p>",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "query",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "Object[]",
            "optional": false,
            "field": "biomes",
            "description": "<p>array of biomes to associate with the project</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "biomes.id_biome",
            "description": "<p>biome id</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": true,
            "field": "biomes.id_ea",
            "description": "<p>environmental</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": true,
            "field": "biomes.id_subzone",
            "description": "<p>sub-basin id</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": true,
            "field": "biomes.natural_area_ha",
            "description": "<p>natural area affected in this biome</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": true,
            "field": "biomes.secondary_area_ha",
            "description": "<p>secondary area affected in this biome</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": true,
            "field": "biomes.transformed_area_ha",
            "description": "<p>transformed area affected in this biome</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": true,
            "field": "biomes.area_impacted_ha",
            "description": "<p>total area affected in this biome</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": true,
            "field": "biomes.area_to_compensate_ha",
            "description": "<p>area to compensate for this biome</p>"
          },
          {
            "group": "body",
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
    "filename": "src/routes/projects.js",
    "groupTitle": "Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "companiesProjects",
    "type": "post",
    "url": "/companies/:id_company/projects",
    "title": "createProject",
    "name": "createProject",
    "version": "0.1.0",
    "description": "<p>Create a project</p>",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "query",
            "type": "Number",
            "optional": false,
            "field": "id_project",
            "description": "<p>project id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>object to be created</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "project.name",
            "description": "<p>project name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "project.details",
            "description": "<p>extra information about the project</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "project.prj_status",
            "description": "<p>project status</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "project.id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "body",
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
    "filename": "src/routes/projects.js",
    "groupTitle": "Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "companiesProjects",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project/biomes",
    "title": "getImpactedBiomes",
    "name": "getImpactedBiomes",
    "version": "0.1.0",
    "description": "<p>Get the impacted biomes for a given project</p>",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "query",
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
    "filename": "src/routes/projects.js",
    "groupTitle": "Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "companiesProjects",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project",
    "title": "getProjectById",
    "name": "getProjectById",
    "version": "0.1.0",
    "description": "<p>Find a project by its id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/projects.js",
    "groupTitle": "Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "companiesProjects",
    "type": "get",
    "url": "/companies/:id_company/projects/:id_project/decisionTree",
    "title": "impactedBiomesDecisionTree",
    "name": "impactedBiomesDecisionTree",
    "version": "0.1.0",
    "description": "<p>Get the impacted biomes decision tree for a given project</p>",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>project's owner id</p>"
          },
          {
            "group": "query",
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
    "filename": "src/routes/projects.js",
    "groupTitle": "Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "companiesProjects",
    "type": "get",
    "url": "/companies/:id_company/projects",
    "title": "listProjectsByCompany",
    "name": "listProjectsByCompany",
    "version": "0.1.0",
    "description": "<p>Find all projects that belongs to a given company. If group_props is passed, results will be grouped by the first prop, then by the second, so on.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id_company",
            "description": "<p>company id to get projects</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/projects.js",
    "groupTitle": "Companies/Projects",
    "groupDescription": "<p>Queries and actions directly related with projects</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea",
    "title": "listEA",
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
            "field": "ea.id_ea",
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
          "content": "[\n  {\n    \"id_ea\": \"CRC\",\n    \"name\": \"Corporacion Autonoma Regional del Cauca\"\n  },\n  {\n    \"id_ea\": \"CORPOGUAVIO\",\n    \"name\": \"Corporacion Autonoma Regional del Guavio\"\n  }...\n]",
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "geofences",
    "type": "get",
    "url": "/geofences/ea/:ea_id/biome/:name_biome/subzone",
    "title": "BiomeBySubzone",
    "name": "BiomeBySubzone",
    "version": "0.1.0",
    "description": "<p>Separate a selected biome total area in the given environmental authority by sub-basins</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ea_id",
            "description": "<p>environmental authority id</p>"
          },
          {
            "group": "Parameter",
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
            "description": "<p>sub-basin name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.area",
            "description": "<p>total area for the associated sub-basin</p>"
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
        "content": "/geofences/ea/CORPOBOYACA/biome/Orobioma Subandino Guane-Yariguíes/subzone",
        "type": "curl"
      }
    ],
    "filename": "src/routes/geofences.js",
    "groupTitle": "Geofences",
    "groupDescription": "<p>Geofences endpoints: Given some kind of geofence, such as environmental authority, get its area divided by some criterion, such as compensation factor, biomes or biotic units</p>"
  },
  {
    "group": "geofences",
    "type": "get",
    "url": "/geofences/ea/:ea_id/bioticUnit",
    "title": "EAByBioticUnit",
    "name": "EAByBioticUnit",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by biotic units</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
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
        "content": "/geofences/ea/CORPOBOYACA/bioticUnit",
        "type": "curl"
      }
    ],
    "filename": "src/routes/geofences.js",
    "groupTitle": "Geofences",
    "groupDescription": "<p>Geofences endpoints: Given some kind of geofence, such as environmental authority, get its area divided by some criterion, such as compensation factor, biomes or biotic units</p>"
  },
  {
    "group": "geofences",
    "type": "get",
    "url": "/geofences/ea/:ea_id/compensationFactor",
    "title": "EAByCompensationFactor",
    "name": "EAByCompensationFactor",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by compensation factor</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
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
        "content": "/geofences/ea/CORPOBOYACA/compensationFactor",
        "type": "curl"
      }
    ],
    "filename": "src/routes/geofences.js",
    "groupTitle": "Geofences",
    "groupDescription": "<p>Geofences endpoints: Given some kind of geofence, such as environmental authority, get its area divided by some criterion, such as compensation factor, biomes or biotic units</p>"
  },
  {
    "group": "geofences",
    "type": "get",
    "url": "/geofences/ea/:ea_id/generalBiome",
    "title": "EAByGeneralBiome",
    "name": "EAByGeneralBiome",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by general biome (different from IAvH biomes).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
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
        "content": "/geofences/ea/CORPOBOYACA/generalBiome",
        "type": "curl"
      }
    ],
    "filename": "src/routes/geofences.js",
    "groupTitle": "Geofences",
    "groupDescription": "<p>Geofences endpoints: Given some kind of geofence, such as environmental authority, get its area divided by some criterion, such as compensation factor, biomes or biotic units</p>"
  },
  {
    "group": "strategies",
    "type": "post",
    "url": "/strategies/biomeSubzoneEA",
    "title": "listStrategiesByBiomeSubzoneEA",
    "name": "listStrategiesByBiomeSubzoneEA",
    "version": "0.1.0",
    "description": "<p>List all strategies filtered by biome, sub-basin and environmental authority. They are grouped by strategy type (id)</p> <p><strong>Some of the response properties are GeoJson standard properties, so they are not described here.</strong></p>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "id_biome",
            "description": "<p>biome id</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "id_subzone",
            "description": "<p>sub-basin id</p>"
          },
          {
            "group": "body",
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
          "title": "Request-Example:",
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
    "filename": "src/routes/strategies.js",
    "groupTitle": "Strategies",
    "groupDescription": "<p>Endpoints related with queries about strategies</p>"
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
    "filename": "src/routes/users.js",
    "groupTitle": "Users",
    "groupDescription": "<p>Endpoint for actions on users</p>"
  }
] });
