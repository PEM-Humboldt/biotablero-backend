define({ "api": [
  {
    "group": "geofences",
    "type": "get",
    "url": "/geofences/ea/:ea_name",
    "title": "getBiomeByEA",
    "name": "getBiomeByEA",
    "version": "0.1.0",
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
    "filename": "src/routes/geofences.js",
    "groupTitle": "geofences"
  }
] });
