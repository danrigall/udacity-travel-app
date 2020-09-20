function checkCountry(geoinfo) {
  if (geoinfo.countryName === 'United States') {
    return geoinfo.adminName1
  } else {
    return geoinfo.countryName
  }
}

export { checkCountry }
