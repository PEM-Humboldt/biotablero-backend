module.exports = (db, models, logger) => ({
  /**
   * Find the area distribution for each protected area category in a given area
   *  and if applies, in the given strategic ecosystem
   *
   * @param {String} areaType area type
   * @param {String} areaId area id
   * @param {String} se strategic ecosystem
   *
   * @return {Object[]} Values of protected areas categories
   */
  findAreaByPA: async (areaType, areaId, se = null) => {
    const query = { [areaType]: areaId };
    if (se !== null) {
      query[se] = 1;
    }
    return db('geo_global_protected_areas as gpa')
      .leftJoin('geo_protected_areas as pa1', 'gpa.anu', 'pa1.id_pa')
      .leftJoin('geo_protected_areas as pa2', 'gpa.dcs', 'pa2.id_pa')
      .leftJoin('geo_protected_areas as pa3', 'gpa.dnmi', 'pa3.id_pa')
      .leftJoin('geo_protected_areas as pa4', 'gpa.drmi', 'pa4.id_pa')
      .leftJoin('geo_protected_areas as pa5', 'gpa.pnn', 'pa5.id_pa')
      .leftJoin('geo_protected_areas as pa6', 'gpa.pnr', 'pa6.id_pa')
      .leftJoin('geo_protected_areas as pa7', 'gpa.rfpn', 'pa7.id_pa')
      .leftJoin('geo_protected_areas as pa8', 'gpa.rfpr', 'pa8.id_pa')
      .leftJoin('geo_protected_areas as pa9', 'gpa.rn', 'pa9.id_pa')
      .leftJoin('geo_protected_areas as pa10', 'gpa.rnsc', 'pa10.id_pa')
      .leftJoin('geo_protected_areas as pa11', 'gpa.sfa', 'pa11.id_pa')
      .leftJoin('geo_protected_areas as pa12', 'gpa.sff', 'pa12.id_pa')
      .leftJoin('geo_protected_areas as pa13', 'gpa.sfl', 'pa13.id_pa')
      .leftJoin('geo_protected_areas as pa14', 'gpa.vp', 'pa14.id_pa')
      .leftJoin('geo_protected_areas as pa15', 'gpa.ar', 'pa15.id_pa')
      .where(query)
      .groupBy(
        'category1',
        'category2',
        'category3',
        'category4',
        'category5',
        'category6',
        'category7',
        'category8',
        'category9',
        'category10',
        'category11',
        'category12',
        'category13',
        'category14',
        'category15',
      )
      .distinct(
        'pa1.category as category1',
        'pa2.category as category2',
        'pa3.category as category3',
        'pa4.category as category4',
        'pa5.category as category5',
        'pa6.category as category6',
        'pa7.category as category7',
        'pa8.category as category8',
        'pa9.category as category9',
        'pa10.category as category10',
        'pa11.category as category11',
        'pa12.category as category12',
        'pa13.category as category13',
        'pa14.category as category14',
        'pa15.category as category15',
      )
      .sum('gpa.area_ha as area')
      .orderBy('area', 'desc')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      });
  },
});
