export type Spot = {
  id: string
  title: string
  lat: number
  lng: number
  image: string
  summary: string
  narrative: string
  background: string
  tags: string[]
  zoom?: number
}

export const spots: Spot[] = [
   
  //宾大校园新加景点

  {
  "id": "penn-smith-walk",
  "title": "Smith Walk, University of Pennsylvania",
  "lat": 39.95149,
  "lng": -75.19106,
  "zoom": 17,
  "image": "/images/penn-smith-walk.jpg",
  "summary": "Tree-lined pedestrian walkway with Penn Engineering banner suspended above; hexagonal pavers and campus benches along both sides.",
  "narrative": "The model sees the distinct Penn Engineering banner, the hexagonal patterned pathway, and surrounding historic facades, identifying this as Smith Walk—an iconic pedestrian spine running through the engineering sector of campus.",
  "background": "Smith Walk is a central landscaped pedestrian corridor between 33rd and 34th Streets. Named in honor of chemist Edgar Fahs Smith, it forms part of Penn's historic campus pathways and connects key engineering buildings including Towne, Hayden, and Levine Hall.",
  "tags": ["university", "campus walkway", "engineering"]
  },
  {
  "id": "penn-skirkanich-hall",
  "title": "Skirkanich Hall, University of Pennsylvania",
  "lat": 39.951914,
  "lng": -75.190755,
  "zoom": 17,
  "image": "/images/penn-skirkanich-hall.jpg", 
  "summary": "Modern glass-and-stone facade with cantilevered entry canopy; located within Penn Engineering complex near 33rd and Walnut.",
  "narrative": "The model identifies the engraved lettering 'SKIRKANICH HALL' and the distinct glass corner lobby. Combined with the coordinates, it recognizes this building as Skirkanich Hall, home to Penn Bioengineering. This entrance view aligns with its north-facing side along 33rd Street.",
  "background": "Opened in 2006 and designed by renowned architects Tod Williams & Billie Tsien, Skirkanich Hall serves as the center for Bioengineering at the University of Pennsylvania. The building connects to Towne Building and Levine Hall, forming part of the Penn Engineering quad.",
  "tags": ["university", "engineering", "modern architecture"]
  },
  {
  "id": "penn-edgar-fahs-smith-statue",
  "title": "Edgar Fahs Smith Statue, University of Pennsylvania",
  "lat": 39.951633,
  "lng": -75.192261,
  "zoom": 17,
  "image": "/images/penn-edgar-fahs-smith-statue.jpg",
  "summary": "Bronze seated statue of Edgar Fahs Smith on a stone pedestal, located at the intersection of Smith Walk and 34th Street within the Penn Engineering precinct.",
  "narrative": "The model identifies the engraved pedestal reading 'EDGAR FAHS SMITH' and recognizes the iconic seated bronze sculpture situated at the east end of Smith Walk. The statue's placement between the Towne and Vagelos Laboratory buildings matches known campus layout and aligns with the provided GPS coordinates.",
  "background": "Created by sculptor R. Tait McKenzie and installed in 1925, the Edgar Fahs Smith statue honors the distinguished chemist and 13th provost of the University of Pennsylvania. Smith was known for his contributions to electrochemistry and the history of chemistry. The statue is a well-known landmark marking the engineering entrance corridor.",
  "tags": ["university", "campus landmark", "statue"]
},
{
  "id": "penn-meyerson-hall",
  "title": "Meyerson Hall, University of Pennsylvania",
  "lat": 39.952464,
  "lng": -75.192069,
  "zoom": 17,
  "image": "/images/penn-meyerson-hall.jpg",
  "summary": "Red-brick modernist academic building with exposed concrete structural frames, home to the Stuart Weitzman School of Design.",
  "narrative": "The model recognizes the Stuart Weitzman School of Design signage on the facade and the distinctive red-brick and concrete architectural style. Combined with the GPS location on Walnut Street near 34th Street, it identifies the building as Meyerson Hall.",
  "background": "Completed in 1967 and named after Martin Meyerson, former president of the University of Pennsylvania, Meyerson Hall houses the Weitzman School of Design. The building includes studios, classrooms, and design research facilities, serving as the center of Penn's architecture and landscape architecture programs.",
  "tags": ["university", "architecture", "design school"]
},
{
  "id": "penn-levine-hall-walnut-street",
  "title": "Levine Hall, University of Pennsylvania",
  "lat": 39.952625,
  "lng": -75.191208,
  "zoom": 17,
  "image": "/images/penn-levine-hall-walnut-street.jpg",
  "summary": "Brick-and-glass academic building along Walnut Street, with a cantilevered glass corner and view facing east toward the Philadelphia skyline.",
  "narrative": "The model identifies the distinctive glass corner façade and dark brick exterior consistent with Levine Hall, part of the Penn Engineering complex. The provided GPS position aligns precisely with Walnut Street just west of 33rd Street, matching the observed street orientation and skyline direction.",
  "background": "Levine Hall, completed in 2003 and designed by architect KieranTimberlake, houses the Department of Computer and Information Science at the University of Pennsylvania. The building connects internally to Wu and Chen Hall and the historic Towne Building, forming part of the core engineering corridor on Walnut Street.",
  "tags": ["university", "engineering", "computer science", "modern architecture"]
},
{
  "id": "penn-lerner-center-chancellor-walk",
  "title": "Lerner Center, University of Pennsylvania",
  "lat": 39.952322,
  "lng": -75.192114,
  "zoom": 17,
  "image": "/images/penn-lerner-center-chancellor-walk.jpg",
  "summary": "Historic red-brick Italianate building along Chancellor Walk, with tall multi-pane windows and a landscaped lawn at its south entrance.",
  "narrative": "The model recognizes the characteristic Italianate brick façade and window detailing of the Lerner Center, home to Penn's Department of Music. The nearby wayfinding sign indicating Chancellor Walk matches the documented accessible entrance to the building from this pedestrian path, and the GPS coordinates align with 201 South 34th Street on the Penn campus.",
  "background": "Originally constructed in the early 1890s as part of the Foulke & Long Institute for Orphan Girls, the building later became the university’s Music Building and was extensively renovated and expanded into the Lerner Center in the late 2000s. The restoration preserved the historic Cope & Stewardson exterior while adding a modern east addition with classrooms, practice rooms, and music technology facilities for the Department of Music.",
  "tags": ["university", "music", "historic building"]
}










]
