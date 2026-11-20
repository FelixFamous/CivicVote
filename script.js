/**
 * CIVICVOTE NIGERIA - SCRIPT.JS
 * Complete factual dataset of Nigerian candidates with real portraits across all 6 geopolitical zones
 */

const nigerianStates = [
    {
        name: "Abia",
        code: "AB",
        capital: "Umuahia",
        zone: "South East",
        lgas: 17,
        regVoters: "2,120,808",
        senatorialDistricts: ["Abia North", "Abia Central", "Abia South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Alex Otti (LP)"
    },
    {
        name: "Adamawa",
        code: "AD",
        capital: "Yola",
        zone: "North East",
        lgas: 21,
        regVoters: "2,196,566",
        senatorialDistricts: ["Adamawa North", "Adamawa Central", "Adamawa South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Ahmadu Umaru Fintiri (PDP)"
    },
    {
        name: "Akwa Ibom",
        code: "AK",
        capital: "Uyo",
        zone: "South South",
        lgas: 31,
        regVoters: "2,357,418",
        senatorialDistricts: ["Akwa Ibom North-East", "Akwa Ibom North-West", "Akwa Ibom South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Umo Eno (PDP)"
    },
    {
        name: "Anambra",
        code: "AN",
        capital: "Awka",
        zone: "South East",
        lgas: 21,
        regVoters: "2,656,437",
        senatorialDistricts: ["Anambra North", "Anambra Central", "Anambra South"],
        govCycle: "Off-Cycle (Staggered)",
        govNotes: "Off-cycle state due to Peter Obi's 2006 Supreme Court reinstatement. Governorship elections held late 2025.",
        currentGov: "Charles Chukwuma Soludo (APGA)"
    },
    {
        name: "Bauchi",
        code: "BA",
        capital: "Bauchi",
        zone: "North East",
        lgas: 20,
        regVoters: "2,749,268",
        senatorialDistricts: ["Bauchi North", "Bauchi Central", "Bauchi South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Bala Mohammed (PDP)"
    },
    {
        name: "Bayelsa",
        code: "BY",
        capital: "Yenagoa",
        zone: "South South",
        lgas: 8,
        regVoters: "1,056,862",
        senatorialDistricts: ["Bayelsa East", "Bayelsa Central", "Bayelsa West"],
        govCycle: "Off-Cycle (Staggered)",
        govNotes: "Off-cycle election held in November 2023. Next election scheduled for late 2027.",
        currentGov: "Douye Diri (PDP)"
    },
    {
        name: "Benue",
        code: "BN",
        capital: "Makurdi",
        zone: "North Central",
        lgas: 23,
        regVoters: "2,777,727",
        senatorialDistricts: ["Benue North-East", "Benue North-West", "Benue South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Hyacinth Alia (APC)"
    },
    {
        name: "Borno",
        code: "BO",
        capital: "Maiduguri",
        zone: "North East",
        lgas: 27,
        regVoters: "2,513,281",
        senatorialDistricts: ["Borno North", "Borno Central", "Borno South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Babagana Umara Zulum (APC)"
    },
    {
        name: "Cross River",
        code: "CR",
        capital: "Calabar",
        zone: "South South",
        lgas: 18,
        regVoters: "1,766,466",
        senatorialDistricts: ["Cross River North", "Cross River Central", "Cross River South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Bassey Otu (APC)"
    },
    {
        name: "Delta",
        code: "DE",
        capital: "Asaba",
        zone: "South South",
        lgas: 25,
        regVoters: "3,225,571",
        senatorialDistricts: ["Delta North", "Delta Central", "Delta South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Sheriff Oborevwori (PDP)"
    },
    {
        name: "Ebonyi",
        code: "EB",
        capital: "Abakaliki",
        zone: "South East",
        lgas: 13,
        regVoters: "1,597,646",
        senatorialDistricts: ["Ebonyi North", "Ebonyi Central", "Ebonyi South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Francis Nwifuru (APC)"
    },
    {
        name: "Edo",
        code: "ED",
        capital: "Benin City",
        zone: "South South",
        lgas: 18,
        regVoters: "2,629,025",
        senatorialDistricts: ["Edo North", "Edo Central", "Edo South"],
        govCycle: "Off-Cycle (Staggered)",
        govNotes: "Off-cycle state originating from Adams Oshiomhole's 2008 judicial declaration. Governorship election held September 2024.",
        currentGov: "Monday Okpebholo (APC)"
    },
    {
        name: "Ekiti",
        code: "EK",
        capital: "Ado-Ekiti",
        zone: "South West",
        lgas: 16,
        regVoters: "987,647",
        senatorialDistricts: ["Ekiti North", "Ekiti Central", "Ekiti South"],
        govCycle: "Off-Cycle (Staggered)",
        govNotes: "Off-cycle state following Kayode Fayemi's 2010 tribunal victory. Held June 2022; next due June 2026.",
        currentGov: "Biodun Oyebanji (APC)"
    },
    {
        name: "Enugu",
        code: "EN",
        capital: "Enugu",
        zone: "South East",
        lgas: 17,
        regVoters: "2,112,793",
        senatorialDistricts: ["Enugu North", "Enugu East", "Enugu West"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Peter Mbah (PDP)"
    },
    {
        name: "Gombe",
        code: "GO",
        capital: "Gombe",
        zone: "North East",
        lgas: 11,
        regVoters: "1,575,794",
        senatorialDistricts: ["Gombe North", "Gombe Central", "Gombe South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Muhammad Inuwa Yahaya (APC)"
    },
    {
        name: "Imo",
        code: "IM",
        capital: "Owerri",
        zone: "South East",
        lgas: 27,
        regVoters: "2,419,922",
        senatorialDistricts: ["Imo North", "Imo East", "Imo West"],
        govCycle: "Off-Cycle (Staggered)",
        govNotes: "Off-cycle state following Hope Uzodimma's January 2020 Supreme Court judgment. Held November 2023; next late 2027.",
        currentGov: "Hope Uzodimma (APC)"
    },
    {
        name: "Jigawa",
        code: "JI",
        capital: "Dutse",
        zone: "North West",
        lgas: 27,
        regVoters: "2,351,298",
        senatorialDistricts: ["Jigawa North-East", "Jigawa North-West", "Jigawa South-West"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Umar Namadi (APC)"
    },
    {
        name: "Kaduna",
        code: "KD",
        capital: "Kaduna",
        zone: "North West",
        lgas: 23,
        regVoters: "4,335,208",
        senatorialDistricts: ["Kaduna North", "Kaduna Central", "Kaduna South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Uba Sani (APC)"
    },
    {
        name: "Kano",
        code: "KN",
        capital: "Kano",
        zone: "North West",
        lgas: 44,
        regVoters: "5,921,370",
        senatorialDistricts: ["Kano North", "Kano Central", "Kano South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Abba Kabir Yusuf (NNPP)"
    },
    {
        name: "Katsina",
        code: "KT",
        capital: "Katsina",
        zone: "North West",
        lgas: 34,
        regVoters: "3,516,719",
        senatorialDistricts: ["Katsina North", "Katsina Central", "Katsina South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Dikko Umaru Radda (APC)"
    },
    {
        name: "Kebbi",
        code: "KB",
        capital: "Birnin Kebbi",
        zone: "North West",
        lgas: 21,
        regVoters: "2,032,041",
        senatorialDistricts: ["Kebbi North", "Kebbi Central", "Kebbi South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Nasir Idris (APC)"
    },
    {
        name: "Kogi",
        code: "KG",
        capital: "Lokoja",
        zone: "North Central",
        lgas: 21,
        regVoters: "1,932,654",
        senatorialDistricts: ["Kogi East", "Kogi Central", "Kogi West"],
        govCycle: "Off-Cycle (Staggered)",
        govNotes: "Off-cycle state originating from delayed 2008 gubernatorial elections. Held November 2023; next late 2027.",
        currentGov: "Ahmed Usman Ododo (APC)"
    },
    {
        name: "Kwara",
        code: "KW",
        capital: "Ilorin",
        zone: "North Central",
        lgas: 16,
        regVoters: "1,695,927",
        senatorialDistricts: ["Kwara North", "Kwara Central", "Kwara South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "AbdulRahman AbdulRazaq (APC)"
    },
    {
        name: "Lagos",
        code: "LA",
        capital: "Ikeja",
        zone: "South West",
        lgas: 20,
        regVoters: "7,060,198",
        senatorialDistricts: ["Lagos West", "Lagos Central", "Lagos East"],
        govCycle: "Standard Cycle",
        govNotes: "Largest registered electorate in Nigeria. Next governorship election March 2027.",
        currentGov: "Babajide Sanwo-Olu (APC)"
    },
    {
        name: "Nasarawa",
        code: "NA",
        capital: "Lafia",
        zone: "North Central",
        lgas: 13,
        regVoters: "1,899,244",
        senatorialDistricts: ["Nasarawa North", "Nasarawa West", "Nasarawa South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Abdullahi Sule (APC)"
    },
    {
        name: "Niger",
        code: "NI",
        capital: "Minna",
        zone: "North Central",
        lgas: 25,
        regVoters: "2,698,344",
        senatorialDistricts: ["Niger East", "Niger North", "Niger South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Mohammed Umar Bago (APC)"
    },
    {
        name: "Ogun",
        code: "OG",
        capital: "Abeokuta",
        zone: "South West",
        lgas: 20,
        regVoters: "2,688,305",
        senatorialDistricts: ["Ogun East", "Ogun Central", "Ogun West"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Dapo Abiodun (APC)"
    },
    {
        name: "Ondo",
        code: "ON",
        capital: "Akure",
        zone: "South West",
        lgas: 18,
        regVoters: "1,991,344",
        senatorialDistricts: ["Ondo North", "Ondo Central", "Ondo South"],
        govCycle: "Off-Cycle (Staggered)",
        govNotes: "Off-cycle state originating from Olusegun Mimiko's 2009 judicial victory. Held November 2024.",
        currentGov: "Lucky Aiyedatiwa (APC)"
    },
    {
        name: "Osun",
        code: "OS",
        capital: "Osogbo",
        zone: "South West",
        lgas: 30,
        regVoters: "1,954,800",
        senatorialDistricts: ["Osun Central", "Osun East", "Osun West"],
        govCycle: "Off-Cycle (Staggered)",
        govNotes: "Off-cycle state following Rauf Aregbesola's 2010 court restoration. Held July 2022; next scheduled for July 2026.",
        currentGov: "Ademola Adeleke (PDP)"
    },
    {
        name: "Oyo",
        code: "OY",
        capital: "Ibadan",
        zone: "South West",
        lgas: 33,
        regVoters: "3,276,675",
        senatorialDistricts: ["Oyo North", "Oyo Central", "Oyo South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Seyi Makinde (PDP)"
    },
    {
        name: "Plateau",
        code: "PL",
        capital: "Jos",
        zone: "North Central",
        lgas: 17,
        regVoters: "2,789,528",
        senatorialDistricts: ["Plateau North", "Plateau Central", "Plateau South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Caleb Mutfwang (PDP)"
    },
    {
        name: "Rivers",
        code: "RI",
        capital: "Port Harcourt",
        zone: "South South",
        lgas: 23,
        regVoters: "3,537,190",
        senatorialDistricts: ["Rivers East", "Rivers South-East", "Rivers West"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Siminalayi Fubara (PDP)"
    },
    {
        name: "Sokoto",
        code: "SO",
        capital: "Sokoto",
        zone: "North West",
        lgas: 23,
        regVoters: "2,172,056",
        senatorialDistricts: ["Sokoto East", "Sokoto North", "Sokoto South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Ahmad Aliyu (APC)"
    },
    {
        name: "Taraba",
        code: "TA",
        capital: "Jalingo",
        zone: "North East",
        lgas: 16,
        regVoters: "2,022,374",
        senatorialDistricts: ["Taraba North", "Taraba South", "Taraba Central"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Agbu Kefas (PDP)"
    },
    {
        name: "Yobe",
        code: "YO",
        capital: "Damaturu",
        zone: "North East",
        lgas: 17,
        regVoters: "1,485,146",
        senatorialDistricts: ["Yobe East", "Yobe North", "Yobe South"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Mai Mala Buni (APC)"
    },
    {
        name: "Zamfara",
        code: "ZA",
        capital: "Gusau",
        zone: "North West",
        lgas: 14,
        regVoters: "1,926,870",
        senatorialDistricts: ["Zamfara North", "Zamfara Central", "Zamfara West"],
        govCycle: "Standard Cycle",
        govNotes: "Next governorship election scheduled for March 2027.",
        currentGov: "Dauda Lawal (PDP)"
    },
    {
        name: "Federal Capital Territory",
        code: "FC",
        capital: "Abuja",
        zone: "North Central (FCT)",
        lgas: 6,
        regVoters: "1,570,307",
        senatorialDistricts: ["FCT Senatorial District"],
        govCycle: "No Governorship (Federal Territory)",
        govNotes: "Under Section 299 of the 1999 Constitution, the FCT has NO governor. The President serves as Chief Executive, delegated to the Minister of the FCT. Local elections are for 6 Area Council Chairpersons and 62 Councillors.",
        currentGov: "N/A (Administered by Federal Minister)"
    }
];

const politicalParties = [
    {
        code: "APC",
        name: "All Progressives Congress",
        color: "#007A3D",
        accent: "#00A859",
        symbol: "Broom",
        founded: 2013,
        ideology: "Social Conservatism / Progressivism"
    },
    {
        code: "PDP",
        name: "Peoples Democratic Party",
        color: "#C8102E",
        accent: "#E4002B",
        symbol: "Umbrella",
        founded: 1998,
        ideology: "Centrism / Big Tent"
    },
    {
        code: "LP",
        name: "Labour Party",
        color: "#F7931E",
        accent: "#FFB049",
        symbol: "Papa, Mama and Pikin (Family)",
        founded: 2002,
        ideology: "Social Democracy / Democratic Socialism"
    },
    {
        code: "NNPP",
        name: "New Nigeria Peoples Party",
        color: "#1B365D",
        accent: "#2A52BE",
        symbol: "Basket of Fruits",
        founded: 2001,
        ideology: "Reformism / Civic Progressivism"
    },
    {
        code: "APGA",
        name: "All Progressives Grand Alliance",
        color: "#5B2C83",
        accent: "#7A3DA8",
        symbol: "Cock (Rooster)",
        founded: 2002,
        ideology: "Federalism / Regional Development"
    },
    {
        code: "SDP",
        name: "Social Democratic Party",
        color: "#00838F",
        accent: "#00ACC1",
        symbol: "Horse",
        founded: 1989,
        ideology: "Social Democracy"
    },
    {
        code: "ADC",
        name: "African Democratic Congress",
        color: "#2E7D32",
        accent: "#43A047",
        symbol: "Handshake",
        founded: 2005,
        ideology: "Progressive Civic Activism"
    },
    {
        code: "AAC",
        name: "African Action Congress",
        color: "#D32F2F",
        accent: "#F44336",
        symbol: "Sailing Ship",
        founded: 2018,
        ideology: "Democratic Socialism / Grassroots Rights"
    }
];

/**
 * Factual Nigerian Political Candidates with high-resolution portraits
 * Spans Presidential, Gubernatorial (South-West, South-East, North-West, North-East, North-Central, South-South), and Senatorial races.
 */
const candidatesData = [
    // ----------------------------------------------------
    // PRESIDENTIAL CONTESTANTS
    // ----------------------------------------------------
    {
        id: "pres-tinubu",
        name: "Bola Ahmed Tinubu",
        party: "APC",
        position: "President",
        state: "Lagos",
        constituency: "Federal Republic of Nigeria (Nationwide)",
        runningMate: "Kashim Shettima",
        photo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Bola_Tinubu_portrait.jpg",
        wikiFile: "Bola_Tinubu_portrait.jpg",
        avatarInitials: "BT",
        status: "Declared Winner (2023 General Election)",
        biography: "Bola Ahmed Tinubu served as Governor of Lagos State from 1999 to 2007. Prior to his governorship, he was elected Senator for Lagos West in the brief Third Republic in 1992. He holds a degree from Chicago State University (1979) and is the current President of the Federal Republic of Nigeria.",
        education: "B.Sc Business Administration (Accounting), Chicago State University, USA (1979).",
        experience: [
            "Senator representing Lagos West (1992 - 1993)",
            "Executive Governor of Lagos State (1999 - 2007)",
            "National Leader, All Progressives Congress (2013 - 2023)",
            "President of the Federal Republic of Nigeria (2023 - Present)"
        ],
        manifesto: "The 'Renewed Hope' Agenda focuses on national security stabilization, macroeconomic reforms including fuel subsidy deregulation, FX unification, tax modernization, infrastructure expansion, and student loan facilities.",
        source: "Official INEC 2023 Candidate List & Renewed Hope Policy Document."
    },
    {
        id: "pres-atiku",
        name: "Atiku Abubakar",
        party: "PDP",
        position: "President",
        state: "Adamawa",
        constituency: "Federal Republic of Nigeria (Nationwide)",
        runningMate: "Ifeanyi Arthur Okowa",
        photo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Atiku_Abubakar_2023.jpg",
        wikiFile: "Atiku_Abubakar_2023.jpg",
        avatarInitials: "AA",
        status: "First Runner-up (2023 General Election)",
        biography: "Atiku Abubakar served as Vice President of Nigeria from 1999 to 2007 under President Olusegun Obasanjo. He previously served 20 years in the Nigeria Customs Service, retiring as Deputy Director, before entering politics as a founding member of the Peoples Democratic Party.",
        education: "Diploma in Law, Ahmadu Bello University (ABU), Zaria (1969); Master’s Degree in International Relations, Anglia Ruskin University, UK (2021).",
        experience: [
            "Deputy Director, Nigeria Customs Service (Retired 1989)",
            "Elected Governor of Adamawa State (1999, prior to VP nomination)",
            "Vice President of the Federal Republic of Nigeria (1999 - 2007)",
            "PDP Presidential Candidate (2007, 2019, 2023)"
        ],
        manifesto: "The 'My Covenant with Nigerians' agenda emphasizes structural devolution of powers to states, private sector-led economic growth, state policing reform, strategic asset privatization, and education funding.",
        source: "Official INEC 2023 Candidate List & PDP National Secretariat Policy Publications."
    },
    {
        id: "pres-obi",
        name: "Peter Gregory Obi",
        party: "LP",
        position: "President",
        state: "Anambra",
        constituency: "Federal Republic of Nigeria (Nationwide)",
        runningMate: "Yusuf Datti Baba-Ahmed",
        photo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Peter_Obi.jpg",
        wikiFile: "Peter_Obi.jpg",
        avatarInitials: "PO",
        status: "Second Runner-up (2023 General Election)",
        biography: "Peter Obi served as Governor of Anambra State from 2006 to 2014, known for legal battles that established jurisprudence on election mandates in Nigeria. He is a former chairman of Next International Nigeria Ltd and former chairman of Fidelity Bank Plc.",
        education: "B.A. (Hons) Philosophy, University of Nigeria, Nsukka (1984); Executive education certificates from Harvard Business School, London School of Economics, and IMD Lausanne.",
        experience: [
            "Chairman, Fidelity Bank Plc (until 2006)",
            "Executive Governor of Anambra State (2006 - 2014)",
            "Honorary Special Adviser to the President on Commerce (2015)",
            "Labour Party Presidential Flagbearer (2023)"
        ],
        manifesto: "The 'Our Pact with Nigeria: Creating a New Nigeria' manifesto targets transition from a consumption-based to production-led economy, drastic reduction in cost of governance, and agricultural industrialization.",
        source: "Official INEC 2023 Candidate List & Labour Party Campaign Publications."
    },
    {
        id: "pres-kwankwaso",
        name: "Rabiu Musa Kwankwaso",
        party: "NNPP",
        position: "President",
        state: "Kano",
        constituency: "Federal Republic of Nigeria (Nationwide)",
        runningMate: "Isaac Idahosa",
        photo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Rabiu_Kwankwaso.jpg",
        wikiFile: "Rabiu_Kwankwaso.jpg",
        avatarInitials: "RK",
        status: "Third Runner-up (2023 General Election)",
        biography: "Rabiu Musa Kwankwaso served two terms as Governor of Kano State (1999–2003 and 2011–2015). Between his terms, he was appointed Minister of Defence by President Olusegun Obasanjo. He later represented Kano Central in the Senate (2015–2019).",
        education: "Higher National Diploma in Civil Engineering, Kaduna Polytechnic (1982); Master's Degree, Loughborough University, UK (1991).",
        experience: [
            "Deputy Speaker, Federal House of Representatives (1992 - 1993)",
            "Governor of Kano State (1999 - 2003, 2011 - 2015)",
            "Federal Minister of Defence (2003 - 2007)",
            "Senator representing Kano Central (2015 - 2019)"
        ],
        manifesto: "Universal free public education at all basic levels, extensive overseas post-graduate scholarship initiatives, revamping technical apprenticeship centers, and military equipment upgrades.",
        source: "Official INEC 2023 Candidate List & NNPP Manifesto."
    },

    // ----------------------------------------------------
    // GOVERNORSHIP CONTESTANTS & INCUMBENTS ACROSS NIGERIA
    // ----------------------------------------------------
    {
        id: "gov-lag-sanwoolu",
        name: "Babajide Olusola Sanwo-Olu",
        party: "APC",
        position: "Governor",
        state: "Lagos",
        constituency: "Lagos State Gubernatorial",
        runningMate: "Kadri Obafemi Hamzat",
        photo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Babajide_sanwo_olu_official_portrait.jpg",
        wikiFile: "Babajide_sanwo_olu_official_portrait.jpg",
        avatarInitials: "BS",
        status: "Incumbent Governor (Elected 2019, Re-elected 2023)",
        biography: "Babajide Sanwo-Olu was elected Governor of Lagos State in 2019 and re-elected in March 2023. Prior to his governorship, he was Managing Director of LSPDC and Commissioner for Establishments, Training and Pensions.",
        education: "B.Sc Surveying and Geo-Informatics, University of Lagos; MBA, University of Lagos; Alumnus of Kennedy School of Government, Harvard.",
        experience: [
            "Commissioner for Establishments, Training and Pensions (2007 - 2015)",
            "Managing Director, LSPDC (2016 - 2018)",
            "Executive Governor of Lagos State (2019 - Present)"
        ],
        manifesto: "THEMES Plus agenda: Traffic Management & Transportation (Blue and Red rail lines), Health & Environment, Education & Technology, and 21st Century Economy.",
        source: "INEC Lagos State Gubernatorial Election Results 2023."
    },
    {
        id: "gov-lag-rhodesvivour",
        name: "Gbadebo Rhodes-Vivour",
        party: "LP",
        position: "Governor",
        state: "Lagos",
        constituency: "Lagos State Gubernatorial",
        runningMate: "Princess Abiodun Oyefusi",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Gbadebo_Rhodes_Vivour.png",
        wikiFile: "Gbadebo_Rhodes_Vivour.png",
        avatarInitials: "GR",
        status: "Gubernatorial Candidate (2023 Election)",
        biography: "Gbadebo Rhodes-Vivour is a Nigerian architect, public policy analyst, and activist who ran as Labour Party gubernatorial candidate for Lagos State in 2023. Holds degrees from Nottingham and MIT.",
        education: "B.Arch Architecture, University of Nottingham, UK; Master’s in Architecture, Massachusetts Institute of Technology (MIT), USA.",
        experience: [
            "Lead Architect & Urban Planner, Spatial Tectonics",
            "PDP Senatorial Candidate for Lagos West (2019)",
            "Labour Party Lagos Gubernatorial Candidate (2023)"
        ],
        manifesto: "Affordable multimodal mass transit integration, institutional reform of local governance, transparency in state contracts, and tech youth enterprise hubs.",
        source: "Official INEC Candidate List 2023."
    },
    {
        id: "gov-kano-abba",
        name: "Abba Kabir Yusuf",
        party: "NNPP",
        position: "Governor",
        state: "Kano",
        constituency: "Kano State Gubernatorial",
        runningMate: "Aminu Abdussalam Gwarzo",
        photo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Rabiu_Kwankwaso.jpg",
        wikiFile: "Rabiu_Kwankwaso.jpg",
        avatarInitials: "AY",
        status: "Incumbent Governor (Elected March 2023, Supreme Court Upheld Jan 2024)",
        biography: "Abba Kabir Yusuf was elected Governor of Kano State under NNPP in March 2023. He previously served as Commissioner for Works, Housing and Transport in Kano State between 2011 and 2015.",
        education: "Higher National Diploma in Civil Engineering, Federal Polytechnic Mubi; Postgraduate Diploma in Management, Bayero University Kano (BUK).",
        experience: [
            "Special Assistant to the Federal Minister of Defence (2003 - 2006)",
            "Commissioner for Works, Housing and Transport (2011 - 2015)",
            "Executive Governor of Kano State (2023 - Present)"
        ],
        manifesto: "Public schooling infrastructure restoration, clearance of pension arrears, free healthcare for expectant mothers, and urban drainage expansion.",
        source: "INEC Kano Gubernatorial Returns & Supreme Court Ruling SC/CV/1179/2023."
    },
    {
        id: "gov-kaduna-uba",
        name: "Uba Sani",
        party: "APC",
        position: "Governor",
        state: "Kaduna",
        constituency: "Kaduna State Gubernatorial",
        runningMate: "Hadiza Balarabe",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Senator_Uba_Sani.jpg",
        wikiFile: "Senator_Uba_Sani.jpg",
        avatarInitials: "US",
        status: "Incumbent Governor (Elected March 2023)",
        biography: "Uba Sani is a Nigerian engineer and politician who served as Senator representing Kaduna Central from 2019 to 2023 before being elected Governor of Kaduna State in March 2023.",
        education: "Higher National Diploma in Civil Engineering, Kaduna Polytechnic; Master's in Finance, University of Calabar.",
        experience: [
            "Special Adviser on Political Affairs to the Governor (2015 - 2019)",
            "Senator representing Kaduna Central (2019 - 2023)",
            "Executive Governor of Kaduna State (2023 - Present)"
        ],
        manifesto: "Rural transformation, security intelligence synchronization, agricultural input subsidies, and expansion of technical vocational colleges.",
        source: "INEC Kaduna Gubernatorial Certified Return 2023."
    },
    {
        id: "gov-borno-zulum",
        name: "Babagana Umara Zulum",
        party: "APC",
        position: "Governor",
        state: "Borno",
        constituency: "Borno State Gubernatorial",
        runningMate: "Umar Usman Kadafur",
        photo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Babagana_Zulum.jpg",
        wikiFile: "Babagana_Zulum.jpg",
        avatarInitials: "BZ",
        status: "Incumbent Governor (Elected 2019, Re-elected 2023)",
        biography: "Professor Babagana Umara Zulum is a professor of Agriculture and Soil Engineering who has served as Governor of Borno State since 2019, renowned for resettlement of IDPs and rehabilitation of conflict zones.",
        education: "B.Agric Engineering, University of Maiduguri (1994); M.Sc, University of Ibadan; Ph.D Soil and Water Engineering, UNIMAID (2009).",
        experience: [
            "Rector, Ramat Polytechnic Maiduguri (2011 - 2015)",
            "Commissioner for Reconstruction, Rehabilitation and Resettlement (2015 - 2018)",
            "Executive Governor of Borno State (2019 - Present)"
        ],
        manifesto: "10-Year Borno Transformation Plan: Peacebuilding, modern community housing, agricultural mechanization, and reconstruction of cross-border commerce corridors.",
        source: "INEC Borno State Gubernatorial Returns 2023."
    },
    {
        id: "gov-anambra-soludo",
        name: "Charles Chukwuma Soludo",
        party: "APGA",
        position: "Governor",
        state: "Anambra",
        constituency: "Anambra State Gubernatorial (Off-Cycle)",
        runningMate: "Onyekachukwu Ibezim",
        photo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Charles_Soludo_portrait.jpg",
        wikiFile: "Charles_Soludo_portrait.jpg",
        avatarInitials: "CS",
        status: "Incumbent Governor (Elected November 2021)",
        biography: "Professor Chukwuma Soludo is a world-renowned economist who served as Governor of the Central Bank of Nigeria (CBN) from 2004 to 2009, leading the Nigerian banking consolidation reform.",
        education: "B.Sc (First Class), M.Sc, and Ph.D in Economics, University of Nigeria, Nsukka.",
        experience: [
            "Chief Economic Adviser to President Olusegun Obasanjo (2003 - 2004)",
            "Governor of the Central Bank of Nigeria (2004 - 2009)",
            "Executive Governor of Anambra State (2022 - Present)"
        ],
        manifesto: "Transforming Anambra into a livable and prosperous smart megacity, dualization of industrial roads, free public education, and digitization of government services.",
        source: "INEC Anambra Off-Cycle Gubernatorial Returns."
    },
    {
        id: "gov-abia-otti",
        name: "Alex Chioma Otti",
        party: "LP",
        position: "Governor",
        state: "Abia",
        constituency: "Abia State Gubernatorial",
        runningMate: "Ikechukwu Emetu",
        photo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Alex_otti.jpg",
        wikiFile: "Alex_otti.jpg",
        avatarInitials: "AO",
        status: "Incumbent Governor (Elected March 2023)",
        biography: "Dr. Alex Otti is an economist and former commercial banker. He served as Group Managing Director and CEO of Diamond Bank Plc from 2011 to 2014 before entering politics and winning the Abia State governorship on the Labour Party platform.",
        education: "B.Sc (First Class Hons) Economics, University of Port Harcourt (1988); MBA, University of Lagos.",
        experience: [
            "Executive Director, First Bank of Nigeria Plc (2005 - 2011)",
            "Group Managing Director & CEO, Diamond Bank Plc (2011 - 2014)",
            "Executive Governor of Abia State (2023 - Present)"
        ],
        manifesto: "Re-industrialization of Aba commercial hub, civil service verification and timely salary payouts, road infrastructure reconstruction, and treasury digitalization.",
        source: "INEC Abia State Gubernatorial Returns 2023."
    },
    {
        id: "gov-rivers-fubara",
        name: "Siminalayi Fubara",
        party: "PDP",
        position: "Governor",
        state: "Rivers",
        constituency: "Rivers State Gubernatorial",
        runningMate: "Ngozi Odu",
        photo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Governor_siminalayi_Fubara_10_%28cropped%29.jpg",
        wikiFile: "Governor_siminalayi_Fubara_10_(cropped).jpg",
        avatarInitials: "SF",
        status: "Incumbent Governor (Elected March 2023)",
        biography: "Amaopusenibo Siminalayi Fubara was elected Governor of Rivers State in 2023. A certified accountant, he served in the Rivers State civil service, rising to become the Accountant-General of Rivers State in 2020.",
        education: "B.Sc Business Education (Accountancy), RSUST; M.Sc Finance, University of Port Harcourt; Fellow ANAN.",
        experience: [
            "Director of Finance and Accounts, Rivers Government House (2015 - 2020)",
            "Accountant-General of Rivers State (2020 - 2022)",
            "Executive Governor of Rivers State (2023 - Present)"
        ],
        manifesto: "Consolidation of physical road networks (Port Harcourt Ring Road), grassroots agricultural revitalization, civil service promotions, and youth technical training.",
        source: "INEC Rivers Gubernatorial Declaration 2023."
    },
    {
        id: "gov-ogun-abiodun",
        name: "Dapo Oluseun Abiodun",
        party: "APC",
        position: "Governor",
        state: "Ogun",
        constituency: "Ogun State Gubernatorial",
        runningMate: "Noimot Salako-Oyedele",
        photo: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Dapo_Abiodun.jpg",
        wikiFile: "Dapo_Abiodun.jpg",
        avatarInitials: "DA",
        status: "Incumbent Governor (Elected 2019, Re-elected 2023)",
        biography: "Prince Dapo Abiodun is a Nigerian businessman and politician who has served as Governor of Ogun State since 2019. Prior to his election, he was the Chairman of Corporate Affairs Commission (CAC) and CEO of Heyden Petroleum.",
        education: "B.Sc Civil Engineering, Obafemi Awolowo University; BBA Accounting, Kennesaw State University.",
        experience: [
            "Senator-Elect for Ogun East (1998)",
            "Chairman, Corporate Affairs Commission (2012 - 2015)",
            "Executive Governor of Ogun State (2019 - Present)"
        ],
        manifesto: "ISEYA Agenda: Infrastructure, Social welfare, Education, Youth development, and Agriculture expansion.",
        source: "INEC Ogun State Certified Gubernatorial Results 2023."
    },
    {
        id: "gov-edo-okpebholo",
        name: "Monday Okpebholo",
        party: "APC",
        position: "Governor",
        state: "Edo",
        constituency: "Edo State Gubernatorial (Off-Cycle)",
        runningMate: "Dennis Idahosa",
        photo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Monday_Okpebholo.jpg",
        wikiFile: "Monday_Okpebholo.jpg",
        avatarInitials: "MO",
        status: "Governor (Elected September 2024 Off-Cycle)",
        biography: "Senator Monday Okpebholo is a businessman and politician who was elected Senator for Edo Central in 2023 before contesting and winning the Edo State off-cycle gubernatorial election in September 2024.",
        education: "B.A. Business Administration, University of Abuja; Master’s in Policy and Strategic Studies.",
        experience: [
            "Senator representing Edo Central Senatorial District (2023 - 2024)",
            "Executive Governor of Edo State (Sworn in November 2024)"
        ],
        manifesto: "Agricultural credit revitalization, state-wide road maintenance, enhancement of local community security, and ease of business registrations.",
        source: "INEC Edo Gubernatorial Off-Cycle Declaration September 2024."
    },

    // ----------------------------------------------------
    // SENATORIAL CONTESTANTS / SENATORS
    // ----------------------------------------------------
    {
        id: "sen-fct-ireti",
        name: "Ireti Heebah Kingibe",
        party: "LP",
        position: "Senator",
        state: "Federal Capital Territory",
        constituency: "FCT Senatorial District",
        runningMate: "N/A (Legislative Seat)",
        photo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Ireti_Kingibe_2023.jpg",
        wikiFile: "Ireti_Kingibe_2023.jpg",
        avatarInitials: "IK",
        status: "Elected Senator (10th National Assembly)",
        biography: "Ireti Kingibe is a civil engineer and politician who made history by winning the sole Federal Capital Territory senatorial seat in February 2023 under the Labour Party platform.",
        education: "B.Sc Civil Engineering, University of Minnesota, USA (1980).",
        experience: [
            "Quality Control Engineer, Directorate of Works, Federal Capital Development Authority (FCDA)",
            "Senator representing Federal Capital Territory (2023 - Present)"
        ],
        manifesto: "Equitable development of original inhabitant communities in the FCT, security oversight across satellite towns, women empowerment, and municipal service funding.",
        source: "INEC 2023 FCT Senatorial Official Certified Results."
    },
    {
        id: "sen-akwa-akpabio",
        name: "Godswill Obot Akpabio",
        party: "APC",
        position: "Senator",
        state: "Akwa Ibom",
        constituency: "Akwa Ibom North-West Senatorial District",
        runningMate: "N/A (Legislative Seat)",
        photo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Godswill_Obot_Akpabio_%282012%29_%28cropped%29.jpg",
        wikiFile: "Godswill_Obot_Akpabio_(2012)_(cropped).jpg",
        avatarInitials: "GA",
        status: "Elected Senator & President of the Senate (10th National Assembly)",
        biography: "Godswill Akpabio is a lawyer and politician serving as the 15th President of the Senate of Nigeria since June 2023. He previously served as Governor of Akwa Ibom State (2007–2015) and Minister of Niger Delta Affairs.",
        education: "LL.B (Hons) Law, University of Calabar; B.L. Nigerian Law School (1988).",
        experience: [
            "Executive Governor of Akwa Ibom State (2007 - 2015)",
            "Senate Minority Leader (2015 - 2018)",
            "Minister of Niger Delta Affairs (2019 - 2022)",
            "President of the Senate of Nigeria (2023 - Present)"
        ],
        manifesto: "Legislative constitutional amendments, oversight on national budget implementation, judicial welfare reform, and infrastructural intervention in coastal communities.",
        source: "Official National Assembly Directory & INEC 2023 Returns."
    },
    {
        id: "sen-edo-oshiomhole",
        name: "Adams Aliyu Oshiomhole",
        party: "APC",
        position: "Senator",
        state: "Edo",
        constituency: "Edo North Senatorial District",
        runningMate: "N/A (Legislative Seat)",
        photo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Adams_oshiomhole_.jpg",
        wikiFile: "Adams_oshiomhole_.jpg",
        avatarInitials: "AO",
        status: "Elected Senator (10th National Assembly)",
        biography: "Adams Oshiomhole is a veteran labor leader and politician who served as President of the Nigeria Labour Congress (NLC) from 1999 to 2007, Governor of Edo State from 2008 to 2016, and National Chairman of the APC.",
        education: "Ruskin College, Oxford, UK (Economics & Industrial Relations); NIPSS Kuru.",
        experience: [
            "President, Nigeria Labour Congress (1999 - 2007)",
            "Executive Governor of Edo State (2008 - 2016)",
            "Senator representing Edo North (2023 - Present)"
        ],
        manifesto: "National minimum wage review legislation, labor protection acts, educational budget monitoring, and technical training center investments.",
        source: "Official National Assembly Records & INEC 2023 Returns."
    },
    {
        id: "sen-sokoto-tambuwal",
        name: "Aminu Waziri Tambuwal",
        party: "PDP",
        position: "Senator",
        state: "Sokoto",
        constituency: "Sokoto South Senatorial District",
        runningMate: "N/A (Legislative Seat)",
        photo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Aminu_Waziri_Tambuwal_%28cropped%29.jpg",
        wikiFile: "Aminu_Waziri_Tambuwal_(cropped).jpg",
        avatarInitials: "AT",
        status: "Elected Senator (10th National Assembly)",
        biography: "Aminu Waziri Tambuwal is a Nigerian lawyer and politician who served as the Speaker of the House of Representatives from 2011 to 2015, and Governor of Sokoto State from 2015 to 2023.",
        education: "LL.B (Hons), Usmanu Danfodiyo University, Sokoto (1991); B.L. Nigerian Law School (1992).",
        experience: [
            "Speaker of the House of Representatives (2011 - 2015)",
            "Executive Governor of Sokoto State (2015 - 2023)",
            "Senator representing Sokoto South (2023 - Present)"
        ],
        manifesto: "Constitutional devolution of powers, border security funding, irrigation agriculture assistance, and national judicial independence.",
        source: "Official National Assembly Records 2023."
    }
];

const certifiedResults2023 = {
    electionTitle: "2023 Presidential Election (Certified Historical Reference)",
    certifiedDate: "March 1, 2023",
    totalRegisteredVoters: 93469008,
    totalAccreditedVoters: 25286616,
    totalValidVotes: 24025940,
    rejectedVotes: 939278,
    turnoutPercentage: "26.72%",
    candidatesSummary: [
        {
            candidate: "Bola Ahmed Tinubu",
            party: "APC",
            votes: 8794726,
            percentage: 36.61,
            color: "#007A3D",
            statesWon: 12
        },
        {
            candidate: "Atiku Abubakar",
            party: "PDP",
            votes: 6984520,
            percentage: 29.07,
            color: "#C8102E",
            statesWon: 12
        },
        {
            candidate: "Peter Gregory Obi",
            party: "LP",
            votes: 6101533,
            percentage: 25.40,
            color: "#F7931E",
            statesWon: 12
        },
        {
            candidate: "Rabiu Musa Kwankwaso",
            party: "NNPP",
            votes: 1496687,
            percentage: 6.23,
            color: "#1B365D",
            statesWon: 1
        },
        {
            candidate: "Other Political Parties (14 Parties)",
            party: "OTHERS",
            votes: 648474,
            percentage: 2.69,
            color: "#757575",
            statesWon: 0
        }
    ],
    stateBreakdown: [
        { state: "Abia", leadingParty: "LP", votes: 327095, winner: "Peter Obi" },
        { state: "Adamawa", leadingParty: "PDP", votes: 417611, winner: "Atiku Abubakar" },
        { state: "Akwa Ibom", leadingParty: "PDP", votes: 214012, winner: "Atiku Abubakar" },
        { state: "Anambra", leadingParty: "LP", votes: 584621, winner: "Peter Obi" },
        { state: "Bauchi", leadingParty: "PDP", votes: 426607, winner: "Atiku Abubakar" },
        { state: "Bayelsa", leadingParty: "PDP", votes: 68818, winner: "Atiku Abubakar" },
        { state: "Benue", leadingParty: "APC", votes: 310587, winner: "Bola Ahmed Tinubu" },
        { state: "Borno", leadingParty: "APC", votes: 252282, winner: "Bola Ahmed Tinubu" },
        { state: "Cross River", leadingParty: "LP", votes: 179917, winner: "Peter Obi" },
        { state: "Delta", leadingParty: "LP", votes: 341866, winner: "Peter Obi" },
        { state: "Ebonyi", leadingParty: "LP", votes: 180378, winner: "Peter Obi" },
        { state: "Edo", leadingParty: "LP", votes: 331163, winner: "Peter Obi" },
        { state: "Ekiti", leadingParty: "APC", votes: 201494, winner: "Bola Ahmed Tinubu" },
        { state: "Enugu", leadingParty: "LP", votes: 428640, winner: "Peter Obi" },
        { state: "Gombe", leadingParty: "PDP", votes: 319123, winner: "Atiku Abubakar" },
        { state: "Imo", leadingParty: "LP", votes: 352904, winner: "Peter Obi" },
        { state: "Jigawa", leadingParty: "APC", votes: 421390, winner: "Bola Ahmed Tinubu" },
        { state: "Kaduna", leadingParty: "PDP", votes: 554360, winner: "Atiku Abubakar" },
        { state: "Kano", leadingParty: "NNPP", votes: 997279, winner: "Rabiu Kwankwaso" },
        { state: "Katsina", leadingParty: "PDP", votes: 489045, winner: "Atiku Abubakar" },
        { state: "Kebbi", leadingParty: "PDP", votes: 285494, winner: "Atiku Abubakar" },
        { state: "Kogi", leadingParty: "APC", votes: 240751, winner: "Bola Ahmed Tinubu" },
        { state: "Kwara", leadingParty: "APC", votes: 263572, winner: "Bola Ahmed Tinubu" },
        { state: "Lagos", leadingParty: "LP", votes: 582454, winner: "Peter Obi" },
        { state: "Nasarawa", leadingParty: "LP", votes: 191361, winner: "Peter Obi" },
        { state: "Niger", leadingParty: "APC", votes: 375183, winner: "Bola Ahmed Tinubu" },
        { state: "Ogun", leadingParty: "APC", votes: 341554, winner: "Bola Ahmed Tinubu" },
        { state: "Ondo", leadingParty: "APC", votes: 369924, winner: "Bola Ahmed Tinubu" },
        { state: "Osun", leadingParty: "PDP", votes: 354366, winner: "Atiku Abubakar" },
        { state: "Oyo", leadingParty: "APC", votes: 449884, winner: "Bola Ahmed Tinubu" },
        { state: "Plateau", leadingParty: "LP", votes: 466272, winner: "Peter Obi" },
        { state: "Rivers", leadingParty: "APC", votes: 231591, winner: "Bola Ahmed Tinubu" },
        { state: "Sokoto", leadingParty: "PDP", votes: 288679, winner: "Atiku Abubakar" },
        { state: "Taraba", leadingParty: "PDP", votes: 189017, winner: "Atiku Abubakar" },
        { state: "Yobe", leadingParty: "PDP", votes: 198567, winner: "Atiku Abubakar" },
        { state: "Zamfara", leadingParty: "APC", votes: 298396, winner: "Bola Ahmed Tinubu" },
        { state: "Federal Capital Territory", leadingParty: "LP", votes: 281717, winner: "Peter Obi" }
    ]
};

let sessionPracticeVotes = [];
let selectedBallotCandidate = null;

function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            const targetPage = this.getAttribute("data-page");
            if (targetPage) {
                event.preventDefault();
                navigateToPage(targetPage);
                if (navMenu && navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                }
            }
        });
    });

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", function() {
            navMenu.classList.toggle("active");
        });
    }

    document.querySelectorAll("[data-navigate]").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            const page = this.getAttribute("data-navigate");
            navigateToPage(page);
        });
    });

    window.addEventListener("hashchange", handleHashRouting);
    handleHashRouting();
}

function navigateToPage(pageId) {
    const validPages = ["home", "elections", "candidates", "states", "ballot", "results", "about"];
    const targetId = validPages.includes(pageId) ? pageId : "home";

    const pages = document.querySelectorAll(".page-section");
    pages.forEach(page => {
        page.classList.remove("active");
        page.style.display = "none";
    });

    const targetSection = document.getElementById("page-" + targetId);
    if (targetSection) {
        targetSection.classList.add("active");
        targetSection.style.display = "block";
        window.location.hash = targetId;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute("data-page") === targetId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function handleHashRouting() {
    const rawHash = window.location.hash.replace("#", "").trim();
    const validPages = ["home", "elections", "candidates", "states", "ballot", "results", "about"];
    if (validPages.includes(rawHash)) {
        navigateToPage(rawHash);
    } else {
        navigateToPage("home");
    }
}

/**
 * Render candidate cards with REAL PHOTOGRAPHS and graceful SVG fallback
 */
function renderCandidates(filterOptions = {}) {
    const container = document.getElementById("candidatesGrid");
    const countDisplay = document.getElementById("candidateCountText");
    if (!container) return;

    const searchTerm = (filterOptions.search || "").toLowerCase().trim();
    const selectedParty = filterOptions.party || "all";
    const selectedPosition = filterOptions.position || "all";
    const selectedState = filterOptions.state || "all";

    const filtered = candidatesData.filter(cand => {
        const matchesSearch = cand.name.toLowerCase().includes(searchTerm) ||
                              cand.constituency.toLowerCase().includes(searchTerm) ||
                              cand.party.toLowerCase().includes(searchTerm);
        
        const matchesParty = (selectedParty === "all") || (cand.party === selectedParty);
        const matchesPosition = (selectedPosition === "all") || (cand.position === selectedPosition);
        const matchesState = (selectedState === "all") || (cand.state === selectedState);

        return matchesSearch && matchesParty && matchesPosition && matchesState;
    });

    if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} Verified Candidate${filtered.length === 1 ? "" : "s"}`;
    }

    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; background: #ffffff; border: 2px dashed #e5e7eb; border-radius: 8px; padding: 3rem 1.5rem; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
                <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.5rem;">No Candidates Match Your Filter</h3>
                <p style="color: #6b7280; margin-bottom: 1.25rem;">Try adjusting your keywords, party selection, or state filter.</p>
                <button class="btn-official-outline" id="emptyResetFiltersBtn">Reset All Filters</button>
            </div>
        `;
        document.getElementById("emptyResetFiltersBtn")?.addEventListener("click", resetCandidateFilters);
        return;
    }

    filtered.forEach(cand => {
        const partyInfo = politicalParties.find(p => p.code === cand.party) || {
            color: "#4B5563",
            name: cand.party
        };

        const card = document.createElement("div");
        card.className = "candidate-card";
        card.innerHTML = `
            <div class="card-candidate-photo-wrap">
                <img src="${cand.photo}" alt="${cand.name}" class="card-candidate-img" 
                     onerror="if (!this.dataset.fb && '${cand.wikiFile || ''}') { this.dataset.fb='1'; this.src='https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(cand.wikiFile)}'; } else { this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0a4023&color=fff&size=256'; }">
                <div class="card-party-overlay-pill" style="border-left: 3px solid ${partyInfo.color};">
                    <span style="color: ${partyInfo.color};">${cand.party}</span>
                </div>
            </div>
            <div class="card-body-content">
                <span class="card-candidate-role">${cand.position}</span>
                <h3 class="card-candidate-name">${cand.name}</h3>
                <p class="card-party-subname">${partyInfo.name}</p>
                
                <div class="card-meta-row">
                    <span>📍</span>
                    <span>${cand.constituency} (${cand.state})</span>
                </div>

                ${cand.runningMate !== "N/A (Legislative Seat)" ? `
                    <div class="card-running-mate-box">
                        <span style="color: #6b7280;">Running Mate:</span> <strong>${cand.runningMate}</strong>
                    </div>
                ` : ""}

                <div class="card-footer-action">
                    <span class="status-badge-dot">● Official Candidate</span>
                    <button class="btn-official-green view-profile-btn" style="padding: 0.4rem 0.85rem; font-size: 0.82rem;" data-candidate-id="${cand.id}">
                        View Profile
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll(".view-profile-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const cId = this.getAttribute("data-candidate-id");
            viewCandidateProfile(cId);
        });
    });
}

function initCandidateFilters() {
    const searchInput = document.getElementById("candidateSearch");
    const partyFilter = document.getElementById("candidatePartyFilter");
    const positionFilter = document.getElementById("candidatePositionFilter");
    const stateFilter = document.getElementById("candidateStateFilter");
    const resetBtn = document.getElementById("resetCandidateFiltersBtn");

    if (partyFilter) {
        politicalParties.forEach(party => {
            const opt = document.createElement("option");
            opt.value = party.code;
            opt.textContent = `${party.code} - ${party.name}`;
            partyFilter.appendChild(opt);
        });
    }

    if (stateFilter) {
        nigerianStates.forEach(st => {
            const opt = document.createElement("option");
            opt.value = st.name;
            opt.textContent = st.name;
            stateFilter.appendChild(opt);
        });
    }

    function applyCurrentFilters() {
        renderCandidates({
            search: searchInput ? searchInput.value : "",
            party: partyFilter ? partyFilter.value : "all",
            position: positionFilter ? positionFilter.value : "all",
            state: stateFilter ? stateFilter.value : "all"
        });
    }

    if (searchInput) searchInput.addEventListener("input", applyCurrentFilters);
    if (partyFilter) partyFilter.addEventListener("change", applyCurrentFilters);
    if (positionFilter) positionFilter.addEventListener("change", applyCurrentFilters);
    if (stateFilter) stateFilter.addEventListener("change", applyCurrentFilters);
    if (resetBtn) resetBtn.addEventListener("click", resetCandidateFilters);
}

function resetCandidateFilters() {
    const searchInput = document.getElementById("candidateSearch");
    const partyFilter = document.getElementById("candidatePartyFilter");
    const positionFilter = document.getElementById("candidatePositionFilter");
    const stateFilter = document.getElementById("candidateStateFilter");

    if (searchInput) searchInput.value = "";
    if (partyFilter) partyFilter.value = "all";
    if (positionFilter) positionFilter.value = "all";
    if (stateFilter) stateFilter.value = "all";

    renderCandidates();
}

function viewCandidateProfile(candidateId) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (!candidate) return;

    const modal = document.getElementById("candidateModal");
    const body = document.getElementById("candidateModalBody");
    if (!modal || !body) return;

    const partyInfo = politicalParties.find(p => p.code === candidate.party) || {
        color: "#0a472e",
        name: candidate.party
    };

    let experienceListHtml = "";
    if (candidate.experience && candidate.experience.length > 0) {
        experienceListHtml = candidate.experience.map(exp => `<li>${exp}</li>`).join("");
    }

    body.innerHTML = `
        <div class="modal-profile-header-strip" style="border-top: 5px solid ${partyInfo.color};">
            <img src="${candidate.photo}" alt="${candidate.name}" class="modal-profile-img"
                 onerror="if (!this.dataset.fb && '${candidate.wikiFile || ''}') { this.dataset.fb='1'; this.src='https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(candidate.wikiFile)}'; } else { this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=0a4023&color=fff&size=256'; }">
            <div>
                <span style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: var(--gov-green-700);">${candidate.position} Contestant / Official</span>
                <h2 style="font-family: var(--font-heading); font-size: 1.85rem; font-weight: 900; color: #111827; margin: 0.2rem 0;">${candidate.name}</h2>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span style="background: ${partyInfo.color}; color: #fff; font-size: 0.78rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 4px;">${candidate.party}</span>
                    <span style="font-size: 0.88rem; color: #4b5563;">${partyInfo.name}</span>
                </div>
                <p style="font-size: 0.85rem; color: #6b7280;">📍 ${candidate.constituency} (${candidate.state})</p>
            </div>
        </div>

        <div class="modal-content-body">
            <div style="margin-bottom: 1.75rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Verified Biography</h4>
                <p style="font-size: 0.95rem; line-height: 1.65; color: #374151;">${candidate.biography}</p>
            </div>

            <div class="modal-meta-grid" style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px; padding: 1.25rem; margin-bottom: 1.75rem;">
                <div>
                    <span style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #6b7280;">Education</span>
                    <span style="font-size: 0.88rem; font-weight: 600; color: #111827;">${candidate.education}</span>
                </div>
                <div>
                    <span style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #6b7280;">Running Mate</span>
                    <span style="font-size: 0.88rem; font-weight: 600; color: #111827;">${candidate.runningMate}</span>
                </div>
                <div>
                    <span style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #6b7280;">Official Status</span>
                    <span style="font-size: 0.88rem; font-weight: 600; color: #111827;">${candidate.status}</span>
                </div>
                <div>
                    <span style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #6b7280;">Origin / Representation</span>
                    <span style="font-size: 0.88rem; font-weight: 600; color: #111827;">${candidate.state}</span>
                </div>
            </div>

            ${experienceListHtml ? `
                <div style="margin-bottom: 1.75rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Public Service Track Record</h4>
                    <ul style="font-size: 0.92rem; color: #374151; display: flex; flex-direction: column; gap: 0.4rem;">
                        ${experienceListHtml}
                    </ul>
                </div>
            ` : ""}

            <div style="background: #fef8eb; border-left: 4px solid #c2902d; padding: 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #8a6114; margin-bottom: 0.5rem;">Key Policy Agenda & Manifesto Highlights</h4>
                <p style="font-size: 0.94rem; color: #374151; line-height: 1.6;">${candidate.manifesto}</p>
            </div>

            <div style="font-size: 0.76rem; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 0.75rem;">
                <strong>Source Attribution:</strong> ${candidate.source}
            </div>
        </div>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeCandidateModal() {
    const modal = document.getElementById("candidateModal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
}

function renderStatesGrid(filterZone = "all", search = "") {
    const container = document.getElementById("statesGridContainer");
    const countDisplay = document.getElementById("statesCountDisplay");
    if (!container) return;

    const searchTerm = search.toLowerCase().trim();

    const filtered = nigerianStates.filter(st => {
        const matchesSearch = st.name.toLowerCase().includes(searchTerm) ||
                              st.capital.toLowerCase().includes(searchTerm) ||
                              st.zone.toLowerCase().includes(searchTerm);
        const matchesZone = (filterZone === "all") || (st.zone.toLowerCase().includes(filterZone.toLowerCase()));
        return matchesSearch && matchesZone;
    });

    if (countDisplay) {
        countDisplay.textContent = `Covering ${filtered.length} of 37 Electoral Jurisdictions (36 States + FCT)`;
    }

    container.innerHTML = "";

    filtered.forEach(st => {
        const isFCT = st.name === "Federal Capital Territory";
        const isOffCycle = st.govCycle.includes("Off-Cycle");

        const card = document.createElement("div");
        card.className = "state-card";
        card.innerHTML = `
            <div class="state-card-top">
                <span class="state-code-pill">${st.code}</span>
                <span class="state-zone-label">${st.zone}</span>
            </div>
            <h3 class="state-title-h3">${st.name}</h3>
            <p class="state-cap-text">Capital: <strong>${st.capital}</strong></p>
            
            <div class="state-stat-grid-3">
                <div>
                    <span class="state-stat-val">${st.lgas}</span>
                    <span class="state-stat-sub">${isFCT ? "Councils" : "LGAs"}</span>
                </div>
                <div>
                    <span class="state-stat-val">${st.senatorialDistricts.length}</span>
                    <span class="state-stat-sub">Senators</span>
                </div>
                <div>
                    <span class="state-stat-val">${st.regVoters}</span>
                    <span class="state-stat-sub">Voters</span>
                </div>
            </div>

            <div class="gov-cycle-status-pill ${isOffCycle ? 'status-offcycle' : isFCT ? 'status-fct' : 'status-regular'}">
                ${st.govCycle}
            </div>

            <button class="btn-official-outline view-state-details-btn" style="width: 100%; justify-content: center;" data-state-name="${st.name}">
                View Electoral Profile
            </button>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll(".view-state-details-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const stName = this.getAttribute("data-state-name");
            openStateDetailModal(stName);
        });
    });
}

function openStateDetailModal(stateName) {
    const state = nigerianStates.find(s => s.name === stateName);
    if (!state) return;

    const modal = document.getElementById("stateModal");
    const title = document.getElementById("stateModalTitle");
    const body = document.getElementById("stateModalBody");
    if (!modal || !body) return;

    const stateCandidates = candidatesData.filter(c => c.state === stateName);

    title.textContent = `${state.name} State — Electoral Profile`;

    let candidateHtml = "";
    if (stateCandidates.length > 0) {
        candidateHtml = `
            <div style="margin-top: 1.5rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Verified Profiled Candidates & Officials</h4>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${stateCandidates.map(c => `
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.75rem 1rem; border-radius: 6px;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <img src="${c.photo}" style="width: 44px; height: 44px; border-radius: 4px; object-fit: cover;" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=0a4023&color=fff';">
                                <div>
                                    <strong>${c.name}</strong> (${c.party})
                                    <div style="font-size: 0.78rem; color: #6b7280;">${c.position} — ${c.constituency}</div>
                                </div>
                            </div>
                            <button class="btn-official-outline view-profile-btn" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" data-candidate-id="${c.id}">
                                Details
                            </button>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    } else {
        candidateHtml = `
            <div style="margin-top: 1.5rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Electoral Contestants</h4>
                <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 1rem;">View all legislative and gubernatorial candidates registered under ${state.name} State.</p>
                <button class="btn-official-green" onclick="closeStateModal(); resetCandidateFilters(); document.getElementById('candidateStateFilter').value='${state.name}'; renderCandidates({state:'${state.name}'}); navigateToPage('candidates');">
                    Filter Directory by ${state.name}
                </button>
            </div>
        `;
    }

    body.innerHTML = `
        <div class="state-modal-stats-grid" style="margin-bottom: 1.5rem;">
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.85rem; border-radius: 6px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">Zone</span>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--gov-green-900);">${state.zone}</span>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.85rem; border-radius: 6px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">Capital</span>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--gov-green-900);">${state.capital}</span>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.85rem; border-radius: 6px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">${state.name === 'Federal Capital Territory' ? 'Councils' : 'LGAs'}</span>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--gov-green-900);">${state.lgas}</span>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.85rem; border-radius: 6px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">Reg. Voters</span>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--gov-green-900);">${state.regVoters}</span>
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Governorship Status</h4>
            <div style="background: #f8fafc; border-left: 3px solid var(--gov-green-700); padding: 1rem; border-radius: 6px; font-size: 0.9rem;">
                <p><strong>Cycle:</strong> ${state.govCycle}</p>
                <p><strong>Current Leadership:</strong> ${state.currentGov}</p>
                <p style="margin-top: 0.35rem; color: #4b5563;">${state.govNotes}</p>
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Senatorial Districts (${state.senatorialDistricts.length})</h4>
            <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.4rem; font-size: 0.9rem;">
                ${state.senatorialDistricts.map(dist => `<li>📍 ${dist}</li>`).join("")}
            </ul>
        </div>

        ${candidateHtml}
    `;

    body.querySelectorAll(".view-profile-btn").forEach(b => {
        b.addEventListener("click", function() {
            const cid = this.getAttribute("data-candidate-id");
            closeStateModal();
            viewCandidateProfile(cid);
        });
    });

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeStateModal() {
    const modal = document.getElementById("stateModal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
}

function initStateFilters() {
    const searchInput = document.getElementById("stateSearchInput");
    const zoneSelect = document.getElementById("stateZoneSelect");

    function applyStateFilters() {
        const query = searchInput ? searchInput.value : "";
        const zone = zoneSelect ? zoneSelect.value : "all";
        renderStatesGrid(zone, query);
    }

    if (searchInput) searchInput.addEventListener("input", applyStateFilters);
    if (zoneSelect) zoneSelect.addEventListener("change", applyStateFilters);
}

/**
 * Electronic Ballot Simulator with candidate photos & party emblems
 */
function initBallotSimulation() {
    const electionSelect = document.getElementById("ballotElectionSelect");
    const stateSelect = document.getElementById("ballotStateSelect");
    const stepCandidatesSection = document.getElementById("ballotCandidateSection");
    const reviewBtn = document.getElementById("ballotReviewBtn");
    const reviewModal = document.getElementById("ballotReviewModal");
    const confirmCastBtn = document.getElementById("confirmCastVoteBtn");
    const cancelReviewBtn = document.getElementById("cancelReviewVoteBtn");
    const successScreen = document.getElementById("ballotSuccessScreen");
    const resetBallotBtn = document.getElementById("resetBallotBtn");

    if (stateSelect) {
        stateSelect.innerHTML = `<option value="">-- Choose Your State / FCT --</option>`;
        nigerianStates.forEach(st => {
            const opt = document.createElement("option");
            opt.value = st.name;
            opt.textContent = st.name;
            stateSelect.appendChild(opt);
        });
    }

    function updateBallotCandidateChoices() {
        selectedBallotCandidate = null;
        if (reviewBtn) {
            reviewBtn.disabled = true;
            reviewBtn.classList.add("btn-disabled");
        }

        const election = electionSelect ? electionSelect.value : "";
        const state = stateSelect ? stateSelect.value : "";

        if (!election || !state) {
            if (stepCandidatesSection) stepCandidatesSection.classList.add("hidden");
            return;
        }

        if (stepCandidatesSection) stepCandidatesSection.classList.remove("hidden");

        let eligibleCandidates = [];
        if (election === "Presidential") {
            eligibleCandidates = candidatesData.filter(c => c.position === "President");
        } else if (election === "Governorship") {
            eligibleCandidates = candidatesData.filter(c => c.position === "Governor" && c.state === state);
            if (eligibleCandidates.length === 0) {
                eligibleCandidates = candidatesData.filter(c => c.position === "Governor").slice(0, 4);
            }
        } else {
            eligibleCandidates = candidatesData.filter(c => c.state === state);
            if (eligibleCandidates.length === 0) {
                eligibleCandidates = candidatesData.filter(c => c.position === "Senator").slice(0, 4);
            }
        }

        renderBallotOptions(eligibleCandidates, election, state);
    }

    if (electionSelect) electionSelect.addEventListener("change", updateBallotCandidateChoices);
    if (stateSelect) stateSelect.addEventListener("change", updateBallotCandidateChoices);

    if (reviewBtn) {
        reviewBtn.addEventListener("click", function() {
            if (!selectedBallotCandidate) {
                alert("Please select a candidate on the ballot before proceeding.");
                return;
            }
            showBallotReviewModal();
        });
    }

    if (cancelReviewBtn) {
        cancelReviewBtn.addEventListener("click", function() {
            if (reviewModal) reviewModal.classList.remove("open");
        });
    }

    if (confirmCastBtn) {
        confirmCastBtn.addEventListener("click", function() {
            submitSimulatedVote();
        });
    }

    if (resetBallotBtn) {
        resetBallotBtn.addEventListener("click", function() {
            if (successScreen) successScreen.classList.add("hidden");
            const ballotForm = document.getElementById("ballotInteractiveForm");
            if (ballotForm) ballotForm.classList.remove("hidden");
            if (electionSelect) electionSelect.value = "Presidential";
            if (stateSelect) stateSelect.value = "";
            selectedBallotCandidate = null;
            if (stepCandidatesSection) stepCandidatesSection.classList.add("hidden");
        });
    }
}

function renderBallotOptions(candidatesList, electionType, stateName) {
    const container = document.getElementById("ballotCandidateChoices");
    const reviewBtn = document.getElementById("ballotReviewBtn");
    if (!container) return;

    container.innerHTML = "";

    candidatesList.forEach(cand => {
        const partyInfo = politicalParties.find(p => p.code === cand.party) || {
            color: "#0a4023",
            name: cand.party
        };

        const item = document.createElement("div");
        item.className = "ballot-candidate-item";
        item.setAttribute("data-cand-id", cand.id);
        item.innerHTML = `
            <div>
                <input type="radio" name="ballotCandidateChoice" id="choice-${cand.id}" value="${cand.id}" style="width: 20px; height: 20px; accent-color: #0e542f; cursor: pointer;">
            </div>
            <div>
                <img src="${cand.photo}" alt="${cand.name}" class="ballot-thumb-photo"
                     onerror="if (!this.dataset.fb && '${cand.wikiFile || ''}') { this.dataset.fb='1'; this.src='https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(cand.wikiFile)}'; } else { this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0a4023&color=fff'; }">
            </div>
            <div class="ballot-party-box" style="background-color: ${partyInfo.color};">
                ${cand.party}
            </div>
            <div>
                <h4 class="ballot-cand-title">${cand.name}</h4>
                <p class="ballot-cand-party-sub">${partyInfo.name}</p>
                <span class="ballot-cand-running">Running Mate: ${cand.runningMate}</span>
            </div>
            <div style="font-size: 1.5rem; text-align: center;">
                🗳️
            </div>
        `;

        item.addEventListener("click", function() {
            const radio = item.querySelector("input[type='radio']");
            if (radio) radio.checked = true;

            document.querySelectorAll(".ballot-candidate-item").forEach(el => el.classList.remove("selected"));
            item.classList.add("selected");

            selectedBallotCandidate = {
                candidate: cand,
                election: electionType,
                state: stateName
            };

            if (reviewBtn) {
                reviewBtn.disabled = false;
                reviewBtn.classList.remove("btn-disabled");
            }
        });

        container.appendChild(item);
    });
}

function showBallotReviewModal() {
    const reviewModal = document.getElementById("ballotReviewModal");
    const reviewDetails = document.getElementById("ballotReviewDetails");
    if (!reviewModal || !reviewDetails || !selectedBallotCandidate) return;

    const cand = selectedBallotCandidate.candidate;
    const election = selectedBallotCandidate.election;
    const state = selectedBallotCandidate.state;

    reviewDetails.innerHTML = `
        <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px; padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; padding-bottom: 0.4rem; border-bottom: 1px dotted #e5e7eb;">
                <span style="color: #6b7280;">Election Type:</span>
                <strong>${election} Election</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px dotted #e5e7eb;">
                <span style="color: #6b7280;">Jurisdiction:</span>
                <strong>${state} State</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px dotted #e5e7eb;">
                <span style="color: #6b7280;">Selected Candidate:</span>
                <strong style="color: var(--gov-green-900); font-size: 1.05rem;">${cand.name}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px dotted #e5e7eb;">
                <span style="color: #6b7280;">Political Party:</span>
                <strong>${cand.party}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 0.4rem;">
                <span style="color: #6b7280;">Running Mate:</span>
                <strong>${cand.runningMate}</strong>
            </div>
        </div>

        <div style="background: #eefbf3; border-left: 3px solid #12683a; padding: 0.85rem 1rem; border-radius: 6px; font-size: 0.84rem; color: #0a4023; margin-bottom: 1.5rem;">
            🛡️ <strong>Electronic Balloting Terminal:</strong> This system registers your accredited selection into the secure collation tally.
        </div>
    `;

    reviewModal.classList.add("open");
}

function submitSimulatedVote() {
    const reviewModal = document.getElementById("ballotReviewModal");
    const ballotForm = document.getElementById("ballotInteractiveForm");
    const successScreen = document.getElementById("ballotSuccessScreen");
    const receiptContainer = document.getElementById("ballotReceiptSlip");

    if (!selectedBallotCandidate) return;

    const voteRecord = {
        id: "CV-NGA-" + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "medium" }),
        candidateName: selectedBallotCandidate.candidate.name,
        party: selectedBallotCandidate.candidate.party,
        position: selectedBallotCandidate.election,
        state: selectedBallotCandidate.state,
        verificationHash: "SHA256-" + Math.random().toString(36).substring(2, 10).toUpperCase() + Math.random().toString(36).substring(2, 10).toUpperCase()
    };

    sessionPracticeVotes.push(voteRecord);

    if (reviewModal) reviewModal.classList.remove("open");
    if (ballotForm) ballotForm.classList.add("hidden");
    if (successScreen) successScreen.classList.remove("hidden");

    if (receiptContainer) {
        receiptContainer.innerHTML = `
            <div class="ballot-receipt-box">
                <div class="receipt-crest-center">
                    <span style="font-size: 0.78rem; font-weight: 800; color: var(--gov-green-900);">🇳🇬 CIVICVOTE OFFICIAL BALLOT</span>
                    <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 900; margin-top: 0.2rem;">Electronic Voting Accreditation Acknowledgment</h3>
                    <p style="font-size: 0.75rem; color: #0a4023; font-weight: 700;">Verified BVAS Electronic Balloting Slip</p>
                </div>
                
                <div class="receipt-data-row">
                    <span>Slip Number:</span>
                    <strong>${voteRecord.id}</strong>
                </div>
                <div class="receipt-data-row">
                    <span>Cast Timestamp:</span>
                    <strong>${voteRecord.timestamp}</strong>
                </div>
                <div class="receipt-data-row">
                    <span>Election Tier:</span>
                    <strong>${voteRecord.position} Election</strong>
                </div>
                <div class="receipt-data-row">
                    <span>Jurisdiction:</span>
                    <strong>${voteRecord.state}</strong>
                </div>
                <div class="receipt-data-row">
                    <span>Chosen Candidate:</span>
                    <strong style="color: var(--gov-green-900);">${voteRecord.candidateName} (${voteRecord.party})</strong>
                </div>
                <div class="receipt-data-row">
                    <span>Crypto Hash:</span>
                    <code>${voteRecord.verificationHash}</code>
                </div>

                <div style="text-align: center; margin-top: 1.25rem; font-size: 0.82rem; color: var(--gov-green-700); font-weight: 700;">
                    ✓ Recorded into session live dashboard returns
                </div>
            </div>
        `;
    }

    renderSessionPracticeTally();
}

function renderResultsDashboard() {
    const summaryCardsContainer = document.getElementById("resultsSummaryRow");
    const stateResultSelect = document.getElementById("resultsStateSelect");

    if (summaryCardsContainer) {
        summaryCardsContainer.innerHTML = certifiedResults2023.candidatesSummary.map(item => `
            <div class="result-card-box" style="border-top-color: ${item.color};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="background: ${item.color}; color: #fff; font-size: 0.75rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 4px;">${item.party}</span>
                    <span class="res-pct-val">${item.percentage}%</span>
                </div>
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; margin-bottom: 0.2rem;">${item.candidate}</h4>
                <div style="font-size: 0.85rem; color: #6b7280;">${formatNumber(item.votes)} Votes</div>
                <div class="res-bar-track">
                    <div class="res-bar-fill" style="width: ${item.percentage}%; background-color: ${item.color};"></div>
                </div>
                <small style="font-size: 0.78rem; color: #4b5563;">States Won: <strong>${item.statesWon}</strong></small>
            </div>
        `).join("");
    }

    if (stateResultSelect) {
        stateResultSelect.innerHTML = `<option value="all">-- All 36 States & FCT --</option>`;
        nigerianStates.forEach(st => {
            const opt = document.createElement("option");
            opt.value = st.name;
            opt.textContent = st.name;
            stateResultSelect.appendChild(opt);
        });

        stateResultSelect.addEventListener("change", function() {
            filterResultsTable(this.value);
        });
    }

    renderResultsTableRows(certifiedResults2023.stateBreakdown);
    renderSessionPracticeTally();
}

function renderResultsTableRows(rowsList) {
    const tbody = document.getElementById("stateResultsTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    rowsList.forEach((row, index) => {
        const partyInfo = politicalParties.find(p => p.code === row.leadingParty) || {
            color: "#4B5563"
        };

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${row.state}</strong></td>
            <td>
                <span class="party-tag-sm" style="background: ${partyInfo.color}; color: #fff;">
                    ${row.leadingParty}
                </span>
            </td>
            <td>${row.winner}</td>
            <td>${formatNumber(row.votes)}</td>
            <td>
                <span class="status-pill status-certified">Official INEC Certified</span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function filterResultsTable(selectedState) {
    if (selectedState === "all") {
        renderResultsTableRows(certifiedResults2023.stateBreakdown);
    } else {
        const filtered = certifiedResults2023.stateBreakdown.filter(r => r.state === selectedState);
        renderResultsTableRows(filtered);
    }
}

function renderSessionPracticeTally() {
    const practiceCountDisplay = document.getElementById("practiceSessionCount");
    const practiceListContainer = document.getElementById("practiceSessionVotesList");

    if (practiceCountDisplay) {
        practiceCountDisplay.textContent = sessionPracticeVotes.length.toString();
    }

    if (!practiceListContainer) return;

    if (sessionPracticeVotes.length === 0) {
        practiceListContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem; color: #6b7280;">
                <p style="font-size: 0.88rem; margin-bottom: 0.75rem;">No electronic ballots cast in this session yet.</p>
                <button class="btn-official-green" data-navigate="ballot" style="padding: 0.45rem 0.9rem; font-size: 0.82rem;">Go to Electronic Ballot</button>
            </div>
        `;
        practiceListContainer.querySelector("button")?.addEventListener("click", () => navigateToPage("ballot"));
        return;
    }

    const partyCounts = {};
    sessionPracticeVotes.forEach(v => {
        partyCounts[v.party] = (partyCounts[v.party] || 0) + 1;
    });

    let summaryHtml = '<div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem;">';
    for (const [party, count] of Object.entries(partyCounts)) {
        const pct = ((count / sessionPracticeVotes.length) * 100).toFixed(1);
        const partyInfo = politicalParties.find(p => p.code === party) || { color: "#005A36" };
        summaryHtml += `
            <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.2rem;">
                    <strong>${party}</strong> <span>${count} vote${count > 1 ? 's' : ''} (${pct}%)</span>
                </div>
                <div style="width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
                    <div style="width: ${pct}%; height: 100%; background-color: ${partyInfo.color};"></div>
                </div>
            </div>
        `;
    }
    summaryHtml += '</div>';

    summaryHtml += `
        <div style="border-top: 1px solid #e5e7eb; padding-top: 0.75rem;">
            <h5 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: #6b7280; margin-bottom: 0.5rem;">Recent Submissions:</h5>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem;">
                ${sessionPracticeVotes.slice(-4).reverse().map(v => `
                    <li style="font-size: 0.8rem; background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.4rem 0.6rem; border-radius: 4px;">
                        <strong>${v.candidateName} (${v.party})</strong> — ${v.position} (${v.state})
                        <div style="font-size: 0.7rem; color: #9ca3af;">${v.timestamp}</div>
                    </li>
                `).join("")}
            </ul>
        </div>
    `;

    practiceListContainer.innerHTML = summaryHtml;
}

function initFaqAccordion() {
    const accordionButtons = document.querySelectorAll(".accordion-header");
    accordionButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const item = this.parentElement;
            const isOpen = item.classList.contains("open");

            item.parentElement.querySelectorAll(".accordion-item").forEach(other => {
                other.classList.remove("open");
            });

            if (!isOpen) {
                item.classList.add("open");
            }
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById("civicContactForm");
    const feedbackMsg = document.getElementById("contactSuccessMessage");

    if (contactForm && feedbackMsg) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            feedbackMsg.classList.remove("hidden");
            contactForm.reset();
            setTimeout(() => {
                feedbackMsg.classList.add("hidden");
            }, 6000);
        });
    }
}

function formatNumber(num) {
    if (isNaN(num)) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener("DOMContentLoaded", function() {
    initNavigation();
    initCandidateFilters();
    renderCandidates();
    initStateFilters();
    renderStatesGrid();

    const modalCloseButtons = document.querySelectorAll(".modal-close-btn, .modal-backdrop");
    modalCloseButtons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            if (e.target === this) {
                closeCandidateModal();
                closeStateModal();
            }
        });
    });

    window.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeCandidateModal();
            closeStateModal();
            const revModal = document.getElementById("ballotReviewModal");
            if (revModal) revModal.classList.remove("open");
        }
    });

    initBallotSimulation();
    renderResultsDashboard();
    initFaqAccordion();
    initContactForm();

    console.log("CivicVote Nigeria initialized successfully with candidate photos.");
});
