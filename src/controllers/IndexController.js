$(document).ready(function () {
  IndexController.initialize();
});

let IndexController = (function () {

  const DEFAULT_MAP_HEIGHT = 600;

  let $mapContainer,
    $mapIndicatorSelect,
    selectedIndicator = 'water',
    countryFilter = '',
    mapStyle = 'heat',
    $mapStyleSelect,
    $resetButton,
    resultsMap,
    data;

  let $sidePanel,
    $sidePanelContent,
    $countryFlag,
    $countryName,
    $countryPopulation,
    $countryWaterAccess,
    $countrySanitationAccess,
    $countryFunding,
    $countryInstitutions;

  let countryTaxonomy,
    implementingPartnerTaxonomy,
    topicTaxonomy,
    tagTaxonomy;

  let $loadingIndicatorOverlay,
    $loadingIndicator;

  const countryCodes = [
    {name: "Afghanistan",alpha_3: "AFG"},
    {name: "Aland Islands",alpha_3: "ALA"},
    {name: "Albania",alpha_3: "ALB"},
    {name: "Algeria",alpha_3: "DZA"},
    {name: "American Samoa",alpha_3: "ASM"},
    {name: "Andorra",alpha_3: "AND"},
    {name: "Angola",alpha_3: "AGO"},
    {name: "Anguilla",alpha_3: "AIA"},
    {name: "Antarctica",alpha_3: "ATA"},
    {name: "Antigua and Barbuda",alpha_3: "ATG"},
    {name: "Argentina",alpha_3: "ARG"},
    {name: "Armenia",alpha_3: "ARM"},
    {name: "Aruba",alpha_3: "ABW"},
    {name: "Australia",alpha_3: "AUS"},
    {name: "Austria",alpha_3: "AUT"},
    {name: "Azerbaijan",alpha_3: "AZE"},
    {name: "Bahamas",alpha_3: "BHS"},
    {name: "Bahrain",alpha_3: "BHR"},
    {name: "Bangladesh",alpha_3: "BGD"},
    {name: "Barbados",alpha_3: "BRB"},
    {name: "Belarus",alpha_3: "BLR"},
    {name: "Belgium",alpha_3: "BEL"},
    {name: "Belize",alpha_3: "BLZ"},
    {name: "Benin",alpha_3: "BEN"},
    {name: "Bermuda",alpha_3: "BMU"},
    {name: "Bhutan",alpha_3: "BTN"},
    {name: "Bolivia",alpha_3: "BOL"},
    {name: "Bonaire, Sint Eustatius and Saba",alpha_3: "BES"},
    {name: "Bosnia and Herzegovina",alpha_3: "BIH"},
    {name: "Botswana",alpha_3: "BWA"},
    {name: "Bouvet Island",alpha_3: "BVT"},
    {name: "Brazil",alpha_3: "BRA"},
    {name: "British Indian Ocean Territory",alpha_3: "IOT"},
    {name: "Brunei Darussalam",alpha_3: "BRN"},
    {name: "Bulgaria",alpha_3: "BGR"},
    {name: "Burkina Faso",alpha_3: "BFA"},
    {name: "Burundi",alpha_3: "BDI"},
    {name: "Cambodia",alpha_3: "KHM"},
    {name: "Cameroon",alpha_3: "CMR"},
    {name: "Canada",alpha_3: "CAN"},
    {name: "Cape Verde",alpha_3: "CPV"},
    {name: "Cayman Islands",alpha_3: "CYM"},
    {name: "Central African Republic",alpha_3: "CAF"},
    {name: "Chad",alpha_3: "TCD"},
    {name: "Chile",alpha_3: "CHL"},
    {name: "China",alpha_3: "CHN"},
    {name: "Christmas Island",alpha_3: "CXR"},
    {name: "Cocos (Keeling) Islands",alpha_3: "CCK"},
    {name: "Colombia",alpha_3: "COL"},
    {name: "Comoros",alpha_3: "COM"},
    {name: "Congo",alpha_3: "COG"},
    {name: "Democratic Republic of Congo",alpha_3: "COD"},
    {name: "Cook Islands",alpha_3: "COK"},
    {name: "Costa Rica",alpha_3: "CRI"},
    {name: "Côte d’Ivoire",alpha_3: "CIV"},
    {name: "Croatia",alpha_3: "HRV"},
    {name: "Cuba",alpha_3: "CUB"},
    {name: "Curacao",alpha_3: "CUW"},
    {name: "Cyprus",alpha_3: "CYP"},
    {name: "Czech Republic",alpha_3: "CZE"},
    {name: "Denmark",alpha_3: "DNK"},
    {name: "Djibouti",alpha_3: "DJI"},
    {name: "Dominica",alpha_3: "DMA"},
    {name: "Dominican Republic",alpha_3: "DOM"},
    {name: "Ecuador",alpha_3: "ECU"},
    {name: "Egypt",alpha_3: "EGY"},
    {name: "El Salvador",alpha_3: "SLV"},
    {name: "Equatorial Guinea",alpha_3: "GNQ"},
    {name: "Eritrea",alpha_3: "ERI"},
    {name: "Estonia",alpha_3: "EST"},
    {name: "Ethiopia",alpha_3: "ETH"},
    {name: "Falkland Islands (Malvinas)",alpha_3: "FLK"},
    {name: "Faroe Islands",alpha_3: "FRO"},
    {name: "Fiji",alpha_3: "FJI"},
    {name: "Finland",alpha_3: "FIN"},
    {name: "France",alpha_3: "FRA"},
    {name: "French Guiana",alpha_3: "GUF"},
    {name: "French Polynesia",alpha_3: "PYF"},
    {name: "French Southern Territories",alpha_3: "ATF"},
    {name: "Gabon",alpha_3: "GAB"},
    {name: "Gambia",alpha_3: "GMB"},
    {name: "Georgia",alpha_3: "GEO"},
    {name: "Germany",alpha_3: "DEU"},
    {name: "Ghana",alpha_3: "GHA"},
    {name: "Gibraltar",alpha_3: "GIB"},
    {name: "Greece",alpha_3: "GRC"},
    {name: "Greenland",alpha_3: "GRL"},
    {name: "Grenada",alpha_3: "GRD"},
    {name: "Guadeloupe",alpha_3: "GLP"},
    {name: "Guam",alpha_3: "GUM"},
    {name: "Guatemala",alpha_3: "GTM"},
    {name: "Guernsey",alpha_3: "GGY"},
    {name: "Guinea",alpha_3: "GIN"},
    {name: "Guinea-Bissau",alpha_3: "GNB"},
    {name: "Guyana",alpha_3: "GUY"},
    {name: "Haiti",alpha_3: "HTI"},
    {name: "Heard Island and McDonald Islands",alpha_3: "HMD"},
    {name: "Holy See (Vatican City State)",alpha_3: "VAT"},
    {name: "Honduras",alpha_3: "HND"},
    {name: "Hong Kong",alpha_3: "HKG"},
    {name: "Hungary",alpha_3: "HUN"},
    {name: "Iceland",alpha_3: "ISL"},
    {name: "India",alpha_3: "IND"},
    {name: "Indonesia",alpha_3: "IDN"},
    {name: "Iran, Islamic Republic of",alpha_3: "IRN"},
    {name: "Iraq",alpha_3: "IRQ"},
    {name: "Ireland",alpha_3: "IRL"},
    {name: "Isle of Man",alpha_3: "IMN"},
    {name: "Israel",alpha_3: "ISR"},
    {name: "Italy",alpha_3: "ITA"},
    {name: "Jamaica",alpha_3: "JAM"},
    {name: "Japan",alpha_3: "JPN"},
    {name: "Jersey",alpha_3: "JEY"},
    {name: "Jordan",alpha_3: "JOR"},
    {name: "Kazakhstan",alpha_3: "KAZ"},
    {name: "Kenya",alpha_3: "KEN"},
    {name: "Kiribati",alpha_3: "KIR"},
    {name: "Korea, Democratic People's Republic of",alpha_3: "PRK"},
    {name: "Korea, Republic of",alpha_3: "KOR"},
    {name: "Kosovo",alpha_3: "XKX"},
    {name: "Kuwait",alpha_3: "KWT"},
    {name: "Kyrgyz Republic",alpha_3: "KGZ"},
    {name: "Lao People's Democratic Republic",alpha_3: "LAO"},
    {name: "Latvia",alpha_3: "LVA"},
    {name: "Lebanon",alpha_3: "LBN"},
    {name: "Lesotho",alpha_3: "LSO"},
    {name: "Liberia",alpha_3: "LBR"},
    {name: "Libyan Arab Jamahiriya",alpha_3: "LBY"},
    {name: "Liechtenstein",alpha_3: "LIE"},
    {name: "Lithuania",alpha_3: "LTU"},
    {name: "Luxembourg",alpha_3: "LUX"},
    {name: "Macao",alpha_3: "MAC"},
    {name: "Macedonia, the Former Yugoslav Republic of",alpha_3: "MKD"},
    {name: "Madagascar",alpha_3: "MDG"},
    {name: "Malawi",alpha_3: "MWI"},
    {name: "Malaysia",alpha_3: "MYS"},
    {name: "Maldives",alpha_3: "MDV"},
    {name: "Mali",alpha_3: "MLI"},
    {name: "Malta",alpha_3: "MLT"},
    {name: "Marshall Islands",alpha_3: "MHL"},
    {name: "Martinique",alpha_3: "MTQ"},
    {name: "Mauritania",alpha_3: "MRT"},
    {name: "Mauritius",alpha_3: "MUS"},
    {name: "Mayotte",alpha_3: "MYT"},
    {name: "Mexico",alpha_3: "MEX"},
    {name: "Micronesia, Federated States of",alpha_3: "FSM"},
    {name: "Moldova, Republic of",alpha_3: "MDA"},
    {name: "Monaco",alpha_3: "MCO"},
    {name: "Mongolia",alpha_3: "MNG"},
    {name: "Montenegro",alpha_3: "MNE"},
    {name: "Montserrat",alpha_3: "MSR"},
    {name: "Morocco",alpha_3: "MAR"},
    {name: "Mozambique",alpha_3: "MOZ"},
    {name: "Myanmar",alpha_3: "MMR"},
    {name: "Namibia",alpha_3: "NAM"},
    {name: "Nauru",alpha_3: "NRU"},
    {name: "Nepal",alpha_3: "NPL"},
    {name: "Netherlands",alpha_3: "NLD"},
    {name: "Netherlands Antilles",alpha_3: "ANT"},
    {name: "New Caledonia",alpha_3: "NCL"},
    {name: "New Zealand",alpha_3: "NZL"},
    {name: "Nicaragua",alpha_3: "NIC"},
    {name: "Niger",alpha_3: "NER"},
    {name: "Nigeria",alpha_3: "NGA"},
    {name: "Niue",alpha_3: "NIU"},
    {name: "Norfolk Island",alpha_3: "NFK"},
    {name: "Northern Mariana Islands",alpha_3: "MNP"},
    {name: "Norway",alpha_3: "NOR"},
    {name: "Oman",alpha_3: "OMN"},
    {name: "Pakistan",alpha_3: "PAK"},
    {name: "Palau",alpha_3: "PLW"},
    {name: "Palestinian Territory, Occupied",alpha_3: "PSE"},
    {name: "Panama",alpha_3: "PAN"},
    {name: "Papua New Guinea",alpha_3: "PNG"},
    {name: "Paraguay",alpha_3: "PRY"},
    {name: "Peru",alpha_3: "PER"},
    {name: "Philippines",alpha_3: "PHL"},
    {name: "Pitcairn",alpha_3: "PCN"},
    {name: "Poland",alpha_3: "POL"},
    {name: "Portugal",alpha_3: "PRT"},
    {name: "Puerto Rico",alpha_3: "PRI"},
    {name: "Qatar",alpha_3: "QAT"},
    {name: "Reunion",alpha_3: "REU"},
    {name: "Romania",alpha_3: "ROM"},
    {name: "Russian Federation",alpha_3: "RUS"},
    {name: "Rwanda",alpha_3: "RWA"},
    {name: "Saint Barthelemy",alpha_3: "BLM"},
    {name: "Saint Helena",alpha_3: "SHN"},
    {name: "Saint Kitts and Nevis",alpha_3: "KNA"},
    {name: "Saint Lucia",alpha_3: "LCA"},
    {name: "Saint Martin",alpha_3: "MAF"},
    {name: "Saint Pierre and Miquelon",alpha_3: "SPM"},
    {name: "Saint Vincent and the Grenadines",alpha_3: "VCT"},
    {name: "Samoa",alpha_3: "WSM"},
    {name: "San Marino",alpha_3: "SMR"},
    {name: "Sao Tome and Principe",alpha_3: "STP"},
    {name: "Saudi Arabia",alpha_3: "SAU"},
    {name: "Senegal",alpha_3: "SEN"},
    {name: "Serbia",alpha_3: "SRB"},
    {name: "Serbia and Montenegro",alpha_3: "SCG"},
    {name: "Seychelles",alpha_3: "SYC"},
    {name: "Sierra Leone",alpha_3: "SLE"},
    {name: "Singapore",alpha_3: "SGP"},
    {name: "St Martin",alpha_3: "SXM"},
    {name: "Slovakia",alpha_3: "SVK"},
    {name: "Slovenia",alpha_3: "SVN"},
    {name: "Solomon Islands",alpha_3: "SLB"},
    {name: "Somalia",alpha_3: "SOM"},
    {name: "South Africa",alpha_3: "ZAF"},
    {name: "South Georgia and the South Sandwich Islands",alpha_3: "SGS"},
    {name: "South Sudan",alpha_3: "SSD"},
    {name: "Spain",alpha_3: "ESP"},
    {name: "Sri Lanka",alpha_3: "LKA"},
    {name: "Sudan",alpha_3: "SDN"},
    {name: "Suriname",alpha_3: "SUR"},
    {name: "Svalbard and Jan Mayen",alpha_3: "SJM"},
    {name: "Swaziland",alpha_3: "SWZ"},
    {name: "Sweden",alpha_3: "SWE"},
    {name: "Switzerland",alpha_3: "CHE"},
    {name: "Syrian Arab Republic",alpha_3: "SYR"},
    {name: "Taiwan, Province of China",alpha_3: "TWN"},
    {name: "Tajikistan",alpha_3: "TJK"},
    {name: "Tanzania",alpha_3: "TZA"},
    {name: "Thailand",alpha_3: "THA"},
    {name: "Timor-Leste",alpha_3: "TLS"},
    {name: "Togo",alpha_3: "TGO"},
    {name: "Tokelau",alpha_3: "TKL"},
    {name: "Tonga",alpha_3: "TON"},
    {name: "Trinidad and Tobago",alpha_3: "TTO"},
    {name: "Tunisia",alpha_3: "TUN"},
    {name: "Turkey",alpha_3: "TUR"},
    {name: "Turkmenistan",alpha_3: "TKM"},
    {name: "Turks and Caicos Islands",alpha_3: "TCA"},
    {name: "Tuvalu",alpha_3: "TUV"},
    {name: "Uganda",alpha_3: "UGA"},
    {name: "Ukraine",alpha_3: "UKR"},
    {name: "United Arab Emirates",alpha_3: "ARE"},
    {name: "United Kingdom",alpha_3: "GBR"},
    {name: "United States",alpha_3: "USA"},
    {name: "United States Minor Outlying Islands",alpha_3: "UMI"},
    {name: "Uruguay",alpha_3: "URY"},
    {name: "Uzbekistan",alpha_3: "UZB"},
    {name: "Vanuatu",alpha_3: "VUT"},
    {name: "Venezuela",alpha_3: "VEN"},
    {name: "Vietnam",alpha_3: "VNM"},
    {name: "Virgin Islands, British",alpha_3: "VGB"},
    {name: "Virgin Islands, U.s.",alpha_3: "VIR"},
    {name: "Wallis and Futuna",alpha_3: "WLF"},
    {name: "Western Sahara",alpha_3: "ESH"},
    {name: "West Bank and Gaza",alpha_3: "WBG"},
    {name: "Yemen",alpha_3: "YEM"},
    {name: "Zambia",alpha_3: "ZMB"},
    {name: "Zimbabwe",alpha_3: "ZWE"}
  ];

  const regionsToRemove = ['Global', 'Africa', 'Sahel Region', 'West Africa', 'Middle East'];

  let initializeGui = () => {
    $mapContainer = $('#map-container');

    $sidePanel = $('#details-side-panel');
    $sidePanelContent = $('#side-panel-content');

    $loadingIndicatorOverlay = $('.loading-overlay');
    $loadingIndicator = $('.loading');

    // initializeMap();
  }

  let initializeEvents = async () => {
    if (!resultsMap) {
      let y  = await getInitialData();
      initializeMap(y)
    }
  }

  function initializeMap(d) {
    let width = WidthHelperModule.getWidthByElementId('map-wrapper');

    resultsMap = scatterMap()
      .width(width)
      .height(DEFAULT_MAP_HEIGHT)
      .data(d)
      // .colorFn(pointColor)
      .onClickCallback(onDisplayCountryDetails)
      .popoverContent(countryPopoverContent);

    d3.select($mapContainer[0])
      .call(resultsMap);
  }

  let getInitialData = async () => {
    data = data ? data : await DataModule.getCountryProjects();
    countryTaxonomy = countryTaxonomy ? countryTaxonomy : await DataRepository.getJson('https://waterc.sg-host.com/wp-json/jet-query-api/get-geographies/');
    implementingPartnerTaxonomy = implementingPartnerTaxonomy ? implementingPartnerTaxonomy : await DataRepository.getJson('https://waterc.sg-host.com/wp-json/jet-query-api/get-impl-partners/');
    topicTaxonomy = topicTaxonomy ? topicTaxonomy : await DataRepository.getJson('https://waterc.sg-host.com/wp-json/jet-query-api/get-topics/');
    tagTaxonomy = tagTaxonomy ? tagTaxonomy :  await DataRepository.getJson('https://waterc.sg-host.com/wp-json/jet-query-api/get-tags/');

    data = data.map((d) => {
      let implementingPartnersArray = [],
        topicsArray = [],
        tagsArray = [];

      for (let i = 0; i < d['implementing_partners'].length; i++) {
        let impPartner = implementingPartnerTaxonomy.find(ip => ip['term_id'] === d['implementing_partners'][i]).name;
        implementingPartnersArray.push(impPartner);
      }

      for (let i = 0; i < d['topic'].length; i++) {
        let topic = topicTaxonomy.find(ip => ip['term_id'] === d['topic'][i]).name;
        topicsArray.push(topic);
      }

      for (let i = 0; i < d['tags'].length; i++) {
        let tag = tagTaxonomy.find(ip => ip['term_id'] === d['tags'][i])?.name;
        tagsArray.push(tag);
      }

      let resultingObject;
      for (let i = 0; i < d.geography.length; i++) {
        resultingObject = {
          ...d,
          country: countryTaxonomy.find(c => c['term_id'] === d.geography[i])?.name,
          implementing_partners: implementingPartnersArray,
          topic: topicsArray,
          tags: tagsArray
        }
      }

      return resultingObject;
    })

    let grouped = data.reduce((acc, el) => {
      let country = el?.country;
      acc[country] ??= { country, projects: [] };
      acc[country].projects.push(el);
      return acc;
    }, {});
    grouped = Object.values(grouped).sort((a,b) => a.country-b.country);

    grouped = grouped.map((g) => {
      return {
        ...g,
        iso3: countryCodes.find(cc => cc.name === g.country)?.alpha_3,
        geography: DataModule.getCountryGeography(countryCodes.find(cc => cc.name === g.country)?.alpha_3)
      }
    });

    return grouped.filter(el => !regionsToRemove.includes(el.country) && el.country !== undefined);
  }

  let getData = (predicate = () => true) => {
    return DataModule.getCountries2022();
  }

  async function onDisplayCountryDetails(country) {
    // let flagHtml = `<div class="flag-lg banner ${country.iso3.toLowerCase()}"></div>`;
    let flagHtml = `<div class="country-header"><h1>${country.country}</h1></div>`;

    let headerHtml = `<div class="modal-header bg-transparent align-items-center p-0">
                        ${flagHtml}
                        <button type="button" class="btn btn-icon btn-light btn-sm border-0 rounded-pill ml-auto btn-close" data-dismiss="modal">
                          <i class="fal fa-times"></i>
                        </button>
                      </div>`;

    $loadingIndicatorOverlay.show();
    $loadingIndicator.show();
    let itemsHtml = await generateProjectsHtml(country);

    let contentHtml = `${headerHtml} <div class="modal-body p2">${itemsHtml}</div>`;

    $sidePanelContent.html(contentHtml);

    $('.project-read-more').on('click', function () {
      let content = $(this).parent().next('.project-info')[0];

      if ($(content).hasClass('hidden')) {
        $(content).removeClass('hidden');
      } else {
        $(content).addClass('hidden');
      }

      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up')
    });

    $sidePanel.modal('show');
    $loadingIndicatorOverlay.hide();
    $loadingIndicator.hide();
  }

  let generateProjectsHtml = async (country) => {
    let projectsHtml = '<div class="projects-container">';

    country.projects.sort((a, b) => a.acf.duration_end < b.acf.duration_end ? 1 : -1);

    for (let i = 0; i < country.projects.length; i++) {
      let project = country.projects[i];
      projectsHtml += '<div class="project-container">';
      projectsHtml += '<div class="project-header">';
      projectsHtml += '<div class="project-name-status">'
      projectsHtml += project.acf.project_status === 'Active' ?
        `<div><span class="project-status-active">Active</span></div>`
        :
        `<div><span class="project-status-closed">Completed</span></div>`;
      projectsHtml += `<div><h5 class="font-weight-bold text-usaid-blue pb-3 pt-2"><a href="${project.link}" target="_blank">${project.title.rendered}</a></h5></div></div>`;

      projectsHtml += project.acf.project_status === 'Active' ?
        `<div class="project-read-more"><i class="fas fa-chevron-up"></i></div></div>`
        :
        `<div class="project-read-more"><i class="fas fa-chevron-down"></i></div></div>`;

      let implementingPartnersString = '';
      for (let j = 0; j < project.implementing_partners.length; j++) {
        implementingPartnersString += j === project.implementing_partners.length - 1 ? project.implementing_partners[j] : project.implementing_partners[j] + ', ';
      }
      
      let tagsString = '';
      for (let j = 0; j < project.tags.length; j++) {
        tagsString += project.tags[j] + ', '
        for (let k = 0; k < project.topic.length; k++) {
          tagsString += project.topic[k] + ', '
        }
      }
      // tagsString = tagsString.substring(0, tagsString.length - 1);

      let primePartnerId = await DataRepository.getJson('https://waterc.sg-host.com/wp-json/jet-rel/34/parents/' + project.id);
      let primePartnerName = implementingPartnerTaxonomy.find(ip => ip['term_id'] === parseInt(primePartnerId[0]?.parent_object_id))?.name;

      projectsHtml += project.acf.project_status === 'Active' ? `<div class="project-info">` : `<div class="project-info hidden">`;
      let dates = `<span style="border-bottom: 1px solid darkgray"><span class="font-weight-bold text-left" style="color: var(--main-red);">Status: </span>${project.acf.project_status}</span><br />`;
      let years = `<span style="border-bottom: 1px solid darkgray"><span class="font-weight-bold text-left" style="color:  var(--main-red);">Years: </span>${project.acf.duration_start} - ${project.acf.duration_end}</span><br />`;
      let primeIP = `<span style="border-bottom: 1px solid darkgray"><span class="font-weight-bold text-left" style="color: var(--main-red)">Prime Implementing Partner: </span>${primePartnerName}</span><br />`;
      let implementingPartners = `<span style="border-bottom: 1px solid darkgray"><span class="font-weight-bold text-left" style="color: var(--main-red)">Implementing Partners: </span>${implementingPartnersString}</span><br />`;
      let cost = `<span style="border-bottom: 1px solid darkgray"><span class="font-weight-bold text-left" style="color: var(--main-red)">Total Estimated Cost: </span>${DataHelper.formatNumber(project.acf.funding_level, '$', '')}</span><br />`;
      let awardNo = `<span style="border-bottom: 1px solid darkgray"><span class="font-weight-bold text-left" style="color: var(--main-red)">Award Number: </span>${project.acf['collection-contract_grant_number'] ? project.acf['collection-contract_grant_number'][0].contract_grant_number : ''}</span><br />`;
      let tags = `<span style="border-bottom: 1px solid darkgray"><span class="font-weight-bold text-left" style="color: var(--main-red)">Tags: </span>${tagsString}</span><br />`;
      // let descriptionHtml = `<span style="border-bottom: 1px solid darkgray"><span class="font-weight-bold text-left" style="color: var(--main-red);">Summary: </span><p class="project-description pt-3">${project.acf.activity_description}</p></span><br />`;
      let urlHtml = `<br/><div class="text-left"><a class="more-link" target="_blank" href="${project.link}">Read more <i class="fas fa-chevron-right" style="color: var(--main-red)"></i></a></div>`;

      projectsHtml += (dates + years + primeIP + implementingPartners + cost + awardNo + tags + urlHtml + `</div></div>`);
    }

    projectsHtml += `</div>`;

    return projectsHtml;
  }

  function buildItemHtml(item, type) {
    let population = DataHelper.formatNumber(item.population);
    let water = DataHelper.formatNumber(item.drinkingWaterServicesAccess, '', ' people');
    let sanitation = DataHelper.formatNumber(item.sanitationServicesAccess, '', ' people');
    let funding = DataHelper.formatNumber(item.valueOfNewFunding, '$', '');
    let institutions = DataHelper.formatNumber(item.institutions);

    let populationHtml = `<li class="media">
                            <div class="mr-3 align-self-top">
                              <i class="fal fa-users icon-2x"></i>
                            </div>
                            <div class="media-body text-left">
                              <h3 class="mb-0">${population}</h3>
                              <span class="text-uppercase font-size-xs text-muted">Population</span>
                            </div>
                          </li>`;

    let waterHtml = `<li class="media">
                       <div class="mr-3 align-self-top">
                         <i class="fal fa-faucet-drip icon-2x"></i>
                       </div>
                       <div class="media-body text-left">
                         <h3 class="mb-0">${water}</h3>
                         <span class="text-uppercase font-size-xs text-muted">Access to Drinking Water</span>
                       </div>
                     </li>`;

    let sanitationHtml = `<li class="media">
                            <div class="mr-3 align-self-top">
                              <i class="fal fa-toilet icon-2x"></i>
                            </div>
                            <div class="media-body text-left">
                              <h3 class="mb-0">${sanitation}</h3>
                              <span class="text-uppercase font-size-xs text-muted">Access to Sanitation</span>
                            </div>
                          </li>`;

    let fundingHtml = `<li class="media">
                         <div class="mr-3 align-self-top">
                           <i class="fal fa-coins icon-2x"></i>
                         </div>
                         <div class="media-body text-left">
                           <h3 class="mb-0">${funding}</h3>
                           <span class="text-uppercase font-size-xs text-muted">New Funding Mobilized</span>
                         </div>
                       </li>`;

    let institutionsHtml = `<li class="media">
                              <div class="mr-3 align-self-top">
                                <i class="fal fa-building icon-2x"></i>
                              </div>
                              <div class="media-body text-left">
                                <h3 class="mb-0">${institutions}</h3>
                                <span class="text-uppercase font-size-xs text-muted">Institutions Strengthened</span>
                              </div>
                            </li>`;

    let webpageHtml = '';

    if (item.webpage !== null) {
      let webpage = item.webpage
        ? `<h3 class="mb-0"><a target="_blank" href="${item.webpage}">Country Page</a></h3>`
        : `<h3 class="mb-0">N/A</h3>`;

      webpageHtml = `<li class="media">
                        <div class="mr-3 align-self-top">
                          <i class="fal fa-hand-pointer icon-2x"></i>
                        </div>
                        <div class="media-body text-left">
                          ${webpage}
                          <span class="text-uppercase font-size-xs text-muted">Click to view on globalwaters.org</span>
                        </div>
                       </li>`;
    }

    let html = `<ul class="media-list pl-3 pt-2 pb-3">
                  ${type === 'country' ? populationHtml : ''}
                  ${waterHtml}
                  ${sanitationHtml}
                  ${fundingHtml}`;

    html += `${webpageHtml}</ul>`

    return html;
  }

  function countryPopoverContent(country) {
    let flagClass = country.iso3.toLowerCase();

    let tooltipContent = `<div class="mb-2 flag ${flagClass}"></div>`;
    tooltipContent += `<div class="mb-2 text-center"><strong>${country.country}</strong></div>`;

    if (country.status) {
      tooltipContent += `<div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="ml-2 status-label">
                              <strong>${country.status}</strong>
                            </div>
                          </div>
                         </div>`;
    }

    return tooltipContent;
  }

  let initialize = async () => {
    initializeGui();
    initializeEvents();
  }

  return {
    initialize: initialize
  }

})();