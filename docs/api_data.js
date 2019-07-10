define({ "api": [
  {
    "group": "basinSubzones",
    "type": "get",
    "url": "/basinSubzones/layers/national",
    "title": "BasinSubzoneNationalLayer",
    "name": "BasinSubzoneNationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by basin subzones</p> <p><strong>The response is a GeoJson object, only the first level will be described here</strong></p>",
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
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, properties, etc)</p>"
          },
          {
            "group": "Success 200",
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
    "filename": "src/routes/basin_subzones.js",
    "groupTitle": "basinSubzones"
  },
  {
    "group": "basins",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se/:se_type/coverage",
    "title": "SECoverageInSubzone",
    "name": "SECoverageInSubzone",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific basin subzone, get the coverage distribution in that area. <br/> The result is the list of cover types with area and percentage inside the specified strategic ecosystem in the basin subzone.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subzone_is",
            "description": "<p>basin subzone id</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/basin_subzones.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
  {
    "group": "basins",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se/:se_type",
    "title": "SEDetailInSubzone",
    "name": "SEDetailInSubzone",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific basin subzone, get more details about that area, for the moment is just the national percentage of that strategic ecosystem</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Parameter",
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
            "description": "<p>strategic ecosystem inside basin subzone percentage with respect to the national area</p>"
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
    "filename": "src/routes/basin_subzones.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
  {
    "group": "basins",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se/:se_type/pa",
    "title": "SEPAInSubzone",
    "name": "SEPAInSubzone",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific basin subzone, get the protected area categories distribution in that area. <br/> The result is the list of protected area types with area and percentage inside the specified strategic ecosystem in the basin subzone and two extra elements: the total protected area inside the specified area and the non protected area.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subzone_is",
            "description": "<p>basin subzone id</p>"
          },
          {
            "group": "Parameter",
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
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  }...\n]",
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
    "filename": "src/routes/basin_subzones.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
  {
    "group": "basins",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/coverage",
    "title": "SubzoneByCoverage",
    "name": "SubzoneByCoverage",
    "version": "0.1.0",
    "description": "<p>Separate the basin subzone total area by coverage type. <br/> The result is the list of cover types with area and percentage inside the basin subzone and an extra element with the total basin subzone area.</p>",
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
    "filename": "src/routes/basin_subzones.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
  {
    "group": "basins",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/pa",
    "title": "SubzoneByPA",
    "name": "SubzoneByPA",
    "version": "0.1.0",
    "description": "<p>Separate the basin subzone total area by protected areas. <br/> The result is the list of protected area types with area and percentage inside the basin subzone and two extra elements: the total protected area inside the basin subzone and the non protected area</p>",
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
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  }...\n]",
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
    "filename": "src/routes/basin_subzones.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
  {
    "group": "basins",
    "type": "get",
    "url": "/basinSubzones/:subzone_id/se",
    "title": "SubzoneBySE",
    "name": "SubzoneBySE",
    "version": "0.1.0",
    "description": "<p>Separate the basin subzone total area by strategic ecosystems. <br/> The result is the list of strategic ecosystems with area and percentage inside the basin subzone and an extra element with the total area inside strategic ecosystems on the basin subzone.</p>",
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
          "content": "[\n  {\n    \"area\": 284538.960066167,\n    \"percentage\": 0.4318134185,\n    \"type\": \"Humedal\"\n  },\n  {\n    \"area\": 166148.838843223,\n    \"percentage\": 0.2521457802,\n    \"type\": \"Páramo\"\n  },\n  {\n    \"area\": 208251.798376851,\n    \"percentage\": 0.3160408014,\n    \"type\": \"Bosque Seco Tropical\"\n  }\n]",
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
    "filename": "src/routes/basin_subzones.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
  {
    "group": "basins",
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
    "filename": "src/routes/basins.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
  {
    "group": "basins",
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
          "content": "[\n {\n    \"id_subzone\": \"2626\",\n    \"name_subzo\": \"Directos Bajo Cauca - Cga La Raya entre río Nechí\",\n    \"id_basin\": \"2\"\n  },\n  {\n    \"id_subzone\": \"3703\",\n    \"name_subzo\": \"Río Cobugón - Río Cobaría\",\n    \"id_basin\": \"3\"\n  },\n]",
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
    "filename": "src/routes/basin_subzones.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
  {
    "group": "basins",
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
    "filename": "src/routes/basins.js",
    "groupTitle": "Basins",
    "groupDescription": "<p>Endpoints related with basins (areas, zones and subzones)</p>"
  },
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
    "url": "/ea/:ea_id/biome/:name_biome/subzone",
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
        "content": "/ea/CORPOBOYACA/biome/Orobioma Subandino Guane-Yariguíes/subzone",
        "type": "curl"
      }
    ],
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/bioticUnit",
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
        "content": "/ea/CORPOBOYACA/bioticUnit",
        "type": "curl"
      }
    ],
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/compensationFactor",
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
        "content": "/ea/CORPOBOYACA/compensationFactor",
        "type": "curl"
      }
    ],
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/coverage",
    "title": "EAByCoverage",
    "name": "EAByCoverage",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by coverage type. <br/> The result is the list of cover types with area and percentage inside the environmental authority and an extra element with the total environmental authority area.</p>",
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/generalBiome",
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
        "content": "/ea/CORPOBOYACA/generalBiome",
        "type": "curl"
      }
    ],
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/pa",
    "title": "EAByPA",
    "name": "EAByPA",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by protected areas. <br/> The result is the list of protected area types with area and percentage inside the environmental authority and two extra elements: the total protected area inside the environmental authority and the non protected area</p>",
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
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  }...\n]",
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/se",
    "title": "EABySE",
    "name": "EABySE",
    "version": "0.1.0",
    "description": "<p>Separate the environmental authority total area by strategic ecosystems. <br/> The result is the list of strategic ecosystems with area and percentage inside the environmental authority and an extra element with the total area inside strategic ecosystems on the environmental authority.</p>",
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
          "content": "[\n  {\n    \"area\": 284538.960066167,\n    \"percentage\": 0.4318134185,\n    \"type\": \"Humedal\"\n  },\n  {\n    \"area\": 166148.838843223,\n    \"percentage\": 0.2521457802,\n    \"type\": \"Páramo\"\n  },\n  {\n    \"area\": 208251.798376851,\n    \"percentage\": 0.3160408014,\n    \"type\": \"Bosque Seco Tropical\"\n  }\n]",
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/layers/national",
    "title": "EANationalLayer",
    "name": "EANationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by environmental authority</p> <p><strong>The response is a GeoJson object, only the first level will be described here</strong></p>",
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
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, properties, etc)</p>"
          },
          {
            "group": "Success 200",
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/se/:se_type/coverage",
    "title": "SECoverageInEA",
    "name": "SECoverageInEA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific environmental authority, get the coverage distribution in that area. <br/> The result is the list of cover types with area and percentage inside the specified strategic ecosystem in the environmental authority.</p>",
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/se/:se_type",
    "title": "SEDetailInEA",
    "name": "SEDetailInEA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific environmental authority, get more details about that area, for the moment is just the national percentage of that strategic ecosystem</p>",
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "ea",
    "type": "get",
    "url": "/ea/:ea_id/se/:se_type/pa",
    "title": "SEPAInEA",
    "name": "SEPAInEA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific environmental authority, get the distribution of protected area categories in that area. <br/> The result is the list of protected area types with area and percentage inside the specified strategic ecosystem in the environmental authority and two extra elements: the total protected area inside the specified area and the non protected area.</p>",
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
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  }...\n]",
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
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
    "filename": "src/routes/environmental_authorities.js",
    "groupTitle": "Environmental Authorities",
    "groupDescription": "<p>Endpoints related with queries about environmental authorities</p>"
  },
  {
    "group": "municipalities",
    "type": "get",
    "url": "/municipalities",
    "title": "listMunicipalities",
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
    "filename": "src/routes/municipalities.js",
    "groupTitle": "Municipalities",
    "groupDescription": "<p>Municipalities endpoints</p>"
  },
  {
    "group": "pa",
    "type": "get",
    "url": "/pa/:category/coverage",
    "title": "PAByCoverage",
    "name": "PAByCoverage",
    "version": "0.1.0",
    "description": "<p>Separate the protected area by coverage type. <br/> The result is the list of cover types with area and percentage inside the protected area category and an extra element with the total state area.</p>",
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
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "pa",
    "type": "get",
    "url": "/pa/:category/pa",
    "title": "PAByPA",
    "name": "PAByPA",
    "version": "0.1.0",
    "description": "<p>Separate the protected area by protected areas. <br/> The result is the list of protected area types with area and percentage inside the protected area category and two extra elements: the total protected area inside the protected area category and the non protected area</p>",
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
          "content": "[\n  {\n    \"percentage\": 0,\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 1,\n    \"type\": \"Parques Naturales Regionales\"\n  }...\n]",
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
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "pa",
    "type": "get",
    "url": "/pa/:category/se",
    "title": "PABySE",
    "name": "PABySE",
    "version": "0.1.0",
    "description": "<p>Separate the protected area by strategic ecosystems. <br/> The result is the list of strategic ecosystems with area and percentage inside the protected area category and an extra element with the total area inside strategic ecosystems on the protected area category.</p>",
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
          "content": "[\n  {\n    \"area\": 284538.960066167,\n    \"percentage\": 0.4318134185,\n    \"type\": \"Humedal\"\n  },\n  {\n    \"area\": 166148.838843223,\n    \"percentage\": 0.2521457802,\n    \"type\": \"Páramo\"\n  },\n  {\n    \"area\": 208251.798376851,\n    \"percentage\": 0.3160408014,\n    \"type\": \"Bosque Seco Tropical\"\n  }\n]",
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
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "pa",
    "type": "get",
    "url": "/pa/layers/national",
    "title": "PANationalLayer",
    "name": "PANationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by protected areas</p> <p><strong>The response is a GeoJson object, only the first level will be described here</strong></p>",
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
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, properties, etc)</p>"
          },
          {
            "group": "Success 200",
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
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "pa",
    "type": "get",
    "url": "/pa/category/:category_name",
    "title": "ProtectedAreasByCategory",
    "name": "ProtectedAreasByCategory",
    "version": "0.1.0",
    "description": "<p>List all protected areas in a given category</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>list of protected areas in category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.gid",
            "description": "<p>protected area id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.name",
            "description": "<p>protected area name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category",
            "description": "<p>protected area category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.organization",
            "description": "<p>organizarion in charge of the protected area</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "[\n  {\n    \"gid\": 1,\n    \"name\": \"Montecristo\",\n    \"category\": \"Reserva Natural de la Sociedad Civil\",\n    \"organization\": \"PNN\"\n  },\n  {\n    \"gid\": 12,\n    \"name\": \"La Esperanza\",\n    \"category\": \"Reserva Natural de la Sociedad Civil\",\n    \"organization\": \"PNN\"\n  },\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/pa/category/Reserva Natural de la Sociedad Civil",
        "type": "curl"
      }
    ],
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "pa",
    "type": "get",
    "url": "/pa/:category/se/:se_type/coverage",
    "title": "SECoverageInPA",
    "name": "SECoverageInPA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific protected area, get the coverage distribution in that area. <br/> The result is the list of cover types with area and percentage inside the specified strategic ecosystem in the protected area category.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "pa",
    "type": "get",
    "url": "/pa/:category/se/:se_type",
    "title": "SEDetailInPA",
    "name": "SEDetailInPA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific protected area, get more details about that area, for the moment is just the national percentage of that strategic ecosystem</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pa_id",
            "description": "<p>protected area id</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "pa",
    "type": "get",
    "url": "/pa/:category/se/:se_type/pa",
    "title": "SEPAInPA",
    "name": "SEPAInPA",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific protected area, get the protected area categories distribution in that area. <br/> The result is the list of protected area types with area and percentage inside the specified strategic ecosystem in the protected area category and two extra elements: the total protected area inside the specified area and the non protected area.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>protected area category</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "pa",
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
    "filename": "src/routes/protected_areas.js",
    "groupTitle": "Protected Areas",
    "groupDescription": "<p>Endpoint with queries about protected areas</p>"
  },
  {
    "group": "se",
    "type": "get",
    "url": "/se/layers/national",
    "title": "SENationalLayer",
    "name": "SENationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by strategic ecosystems</p> <p><strong>The response is a GeoJson object, only the first level will be described here</strong></p>",
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
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, properties, etc)</p>"
          },
          {
            "group": "Success 200",
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
    "filename": "src/routes/strategic_ecosystems.js",
    "groupTitle": "Strategic Ecosystems",
    "groupDescription": "<p>Strategic Ecosystems endpoints</p>"
  },
  {
    "group": "se",
    "type": "get",
    "url": "/se/:ecosystem/national",
    "title": "ecosystemInfo",
    "name": "ecosystemInfo",
    "version": "0.1.0",
    "description": "<p>Get the ecosystem national information</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
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
    "filename": "src/routes/strategic_ecosystems.js",
    "groupTitle": "Strategic Ecosystems",
    "groupDescription": "<p>Strategic Ecosystems endpoints</p>"
  },
  {
    "group": "se",
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
    "filename": "src/routes/strategic_ecosystems.js",
    "groupTitle": "Strategic Ecosystems",
    "groupDescription": "<p>Strategic Ecosystems endpoints</p>"
  },
  {
    "group": "se",
    "type": "get",
    "url": "/se",
    "title": "listSE",
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
    "filename": "src/routes/strategic_ecosystems.js",
    "groupTitle": "Strategic Ecosystems",
    "groupDescription": "<p>Strategic Ecosystems endpoints</p>"
  },
  {
    "group": "se",
    "type": "get",
    "url": "/se/:ecosystem/coverage",
    "title": "seByCoverage",
    "name": "seByCoverage",
    "version": "0.1.0",
    "description": "<p>Get the strategic ecosystem area separated by coverage</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
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
          "content": "[\n  {\n    \"percentage\": 0.25,\n    \"type\": \"narutal\"\n  },\n  {\n    \"percentage\": 0.1,\n    \"type\": \"transformed\"\n  }\n],",
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
    "filename": "src/routes/strategic_ecosystems.js",
    "groupTitle": "Strategic Ecosystems",
    "groupDescription": "<p>Strategic Ecosystems endpoints</p>"
  },
  {
    "group": "se",
    "type": "get",
    "url": "/se/:ecosystem/pa",
    "title": "seByPA",
    "name": "seByPA",
    "version": "0.1.0",
    "description": "<p>Get the strategic ecosystem area separated by protected areas</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
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
          "content": "[\n  {\n    \"percentage\": 0.04,\n    \"category\": \"Reserva Natural de la Sociedad Civil\"\n  },\n  {\n    \"percentage\": 0.1,\n    \"category\": \"Parque Nacional Natural\"\n  }\n]",
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
    "filename": "src/routes/strategic_ecosystems.js",
    "groupTitle": "Strategic Ecosystems",
    "groupDescription": "<p>Strategic Ecosystems endpoints</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states/:state_id/se/:se_type/coverage",
    "title": "SECoverageInState",
    "name": "SECoverageInState",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific state, get the coverage distribution in that area. <br/> The result is the list of cover types with area and percentage inside the specified strategic ecosystem in the state.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states/:state_id/se/:se_type",
    "title": "SEDetailInState",
    "name": "SEDetailInState",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific state, get more details about that area, for the moment is just the national percentage of that strategic ecosystem</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Parameter",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states/:state_id/se/:se_type/pa",
    "title": "SEPAInState",
    "name": "SEPAInState",
    "version": "0.1.0",
    "description": "<p>Given an strategic ecosystem type inside an specific state, get the protected area categories distribution in that area. <br/> The result is the list of protected area types with area and percentage inside the specified strategic ecosystem in the state and two extra elements: the total protected area inside the specified area and the non protected area.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state_id",
            "description": "<p>state id</p>"
          },
          {
            "group": "Parameter",
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
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  }...\n]",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states/:state_id/coverage",
    "title": "StateByCoverage",
    "name": "StateByCoverage",
    "version": "0.1.0",
    "description": "<p>Separate the state total area by coverage type. <br/> The result is the list of cover types with area and percentage inside the state and an extra element with the total state area.</p>",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states/:state_id/pa",
    "title": "StateByPA",
    "name": "StateByPA",
    "version": "0.1.0",
    "description": "<p>Separate the state total area by protected areas. <br/> The result is the list of protected area types with area and percentage inside the state and two extra elements: the total protected area inside the state and the non protected area.</p>",
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
          "content": "[\n  {\n    \"percentage\": 0.4437728527,\n    \"area\": \"1493.945506792712753\",\n    \"type\": \"Santuario de Fauna y Flora\"\n  },\n  {\n    \"percentage\": 0.5562271473,\n    \"area\": \"158.998859058673413\",\n    \"type\": \"Parques Naturales Regionales\"\n  }...\n]",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states/:state_id/se",
    "title": "StateBySE",
    "name": "StateBySE",
    "version": "0.1.0",
    "description": "<p>Separate the state total area by strategic ecosystems. <br/> The result is the list of strategic ecosystems with area and percentage inside the state and an extra element with the total area inside strategic ecosystems on the state.</p>",
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
          "content": "[\n  {\n    \"area\": 284538.960066167,\n    \"percentage\": 0.4318134185,\n    \"type\": \"Humedal\"\n  },\n  {\n    \"area\": 166148.838843223,\n    \"percentage\": 0.2521457802,\n    \"type\": \"Páramo\"\n  },\n  {\n    \"area\": 208251.798376851,\n    \"percentage\": 0.3160408014,\n    \"type\": \"Bosque Seco Tropical\"\n  }\n]",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states/layers/national",
    "title": "StatesNationalLayer",
    "name": "StatesNationalLayer",
    "version": "0.1.0",
    "description": "<p>Get the national layer divided by states</p> <p><strong>The response is a GeoJson object, only the first level will be described here</strong></p>",
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
            "description": "<p>The geometry type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.totalFeatures",
            "description": "<p>number of features in this geometry</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result.features",
            "description": "<p>features information (id, type, properties, etc)</p>"
          },
          {
            "group": "Success 200",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states",
    "title": "listStates",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
  },
  {
    "group": "states",
    "type": "get",
    "url": "/states/:state_id/municipalities",
    "title": "stateByMunicipalities",
    "name": "stateByMunicipalities",
    "version": "0.1.0",
    "description": "<p>List all municipalities information in the given state</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
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
    "filename": "src/routes/states.js",
    "groupTitle": "States",
    "groupDescription": "<p>Endpoints related with queries about states</p>"
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
