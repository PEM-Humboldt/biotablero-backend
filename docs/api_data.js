define({ "api": [
  {
    "group": "company_projects",
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
            "type": "String",
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
            "field": "project.region",
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
          "content": "[\n  {\n    \"gid\": 1,\n    \"name\": \"ALFEREZ-SANMARCOS\",\n    \"prj_status\": \"DAA\",\n    \"region\": \"ZONA OCCIDENTE\",\n    \"area_ha\": \"233.73530000000\",\n    \"id_company\": 1,\n    \"label\": \"Alferez Sanmarcos\"\n  }...\n]",
          "type": "json"
        },
        {
          "title": "group_props success-Example:",
          "content": "{\n  \"label\": \"Zona Occidente\",\n  \"ZONA OCCIDENTE\": {\n    \"label\": \"Daa\",\n    \"DAA\": [\n      {\n        \"gid\": 1,\n        \"name\": \"ALFEREZ-SANMARCOS\",\n        \"prj_status\": \"DAA\",\n        \"region\": \"ZONA OCCIDENTE\",\n        \"area_ha\": \"233.73530000000\",\n        \"id_company\": 1,\n        \"label\": \"Alferez Sanmarcos\"\n      }...\n    ],\n    \"LICENCIADO\": [...]\n  }...\n]",
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
        "content": "/companies/1/projects?group_props=region,prj_status",
        "type": "curl"
      }
    ],
    "filename": "src/routes/projects.js",
    "groupTitle": "company_projects"
  },
  {
    "group": "geofences",
    "type": "get",
    "url": "/geofences/ea/:ea_name",
    "title": "getBiomeByEA",
    "name": "getBiomeByEA",
    "version": "0.1.0",
    "description": "<p>Find all biomes that belong to the given environmental authority</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ea_name",
            "description": "<p>environmental authority to filter biomes</p>"
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
            "field": "biome",
            "description": "<p>biome information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "biome.gid",
            "description": "<p>biome id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "biome.name_biome",
            "description": "<p>biome name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "biome.id_ea",
            "description": "<p>env authority id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "biome.geomTopoJSON",
            "description": "<p>biome geometry in topoJson</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"gid\": 252,\n    \"name_biome\": \"Hidrobioma Magdalena medio y depresión momposina\",\n    \"id_ea\":\"CORPOBOYACA\",\n    \"geomTopoJSON\": {...}\n  }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/geofences/ea/CORPOBOYACA",
        "type": "curl"
      }
    ],
    "filename": "src/routes/geofences.js",
    "groupTitle": "geofences"
  }
] });
