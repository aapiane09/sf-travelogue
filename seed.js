//seed.js
var db = require("./models");

var neighborhoodsList = [];

neighborhoodsList.push({
  name: "Financial District",
  description: "Occasionally called the “FiDi” (although we’ve yet to hear many actual San Franciscan’s use the term), the Financial District neighborhood of San Francisco is aptly named for an abundance of modern and historic buildings that house headquarters of corporations like Charles Schwab, Gap Inc., VISA, the 12th district of the Federal Reserve and more. This area isn’t all work and no play, though; shopping malls like Embarcadero Center, the Ferry Building and Crocker Galleria frequently welcome spree-loving locals and leisure travelers. By virtue of all the businesses in the area, there are also plenty of snazzy little bars where many of the corporate bigwigs have been known to enjoy a martini lunch.",
  places: [
    {
      name: "General Assembly",
      address: "255 Bush St",
      category: "Education",
      goodStuff: "Master new skills in design, marketing, technology, and data — online or at our campuses around the world.",
      openingHour: "8:30 AM",
      closingHour: "10:00 PM",
    },
    {
      name: "Punch Line Comedy Club",
      address: "444 Battery St",
      category: "Entertainment",
      goodStuff: "The venue is beautifully designed, the wait staff is prompt and the potent drinks and palate-pleasing dishes provide sustenance for hours-long laughing fits",
      openingHour: "3:00 PM",
      closingHour: "6:00 PM",
    },
    {
      name: "Tadich Grill",
      address: "240 California St",
      category: "Restaurant",
      goodStuff: "Seafood is the standard, prepared a variety of ways (mesquite-grilled, baked in a casserole) and always impeccable in quality.",
      openingHour: "11:30 AM",
      closingHour: "9:30 PM",
    }
  ],
  imageUrl: "images/fidi.jpg"
});
neighborhoodsList.push({
  name: "Fisherman's Wharf",
  description: "Popular with tourists and sea lions, Fisherman's Wharf is full of shops, silly museums and family fun. Still a working wharf, its vendors sell thousands of tons of fish and shellfish. Take an early morning walk down 'Fish Alley' to see fisherman at work. Later, the Wharf is boardwalk-style family entertainment with decidedly tourist attractions such as Ripley's Believe It or Not! Museum, the Red & White Fleet, the Wax Museum, and, of rare interest to local San Franciscans, the Aquarium. For maritime-lovers and WWII buffs, the San Francisco Maritime Musuem is at the foot of Polk St. and massive USS Pampanito is docked right at Pier 45.",
  places: [
    {
      name: "Pier 39",
      address: "Beach Street & The Embarcadero",
      category: "Shopping",
      goodStuff: "Bustling bayside pier featuring scenic views, sea-lion sightings, eateries, shops & entertainment.",
      openingHour: "10:00 AM",
      closingHour: "10:00 PM",
    },
    {
      name: "Bistro Boudin",
      address: "160 Jefferson Street",
      category: "Restaurant",
      goodStuff: "Clam Chowder with senic views of the San Francisco Bay",
      openingHour: "11:30AM",
      closingHour: "9:30 PM",
    },
    {
      name: "The Red Jack Saloon",
      address: "131 Bay St",
      category: "Bar",
      goodStuff: "This sports bar is was a nice place to sit down, relax, drink a couple, and watch a game.",
      openingHour: "1:00 PM",
      closingHour: "2:00 AM",
    }
  ],
  imageUrl: "images/fishermanswharf.jpg"
});
neighborhoodsList.push({
  name: "The Mission",
  description: "The heart of San Francisco's predominantly Latino neighborhood is 24th Street, a colorful collection of authentic restaurants, taquerias, Mexican bakeries, produce markets, specialty shops and murals. Mission Dolores at 16th and Dolores streets is the oldest structure in San Francisco (many of San Francisco's Spanish pioneers are buried on the site) and, two blocks away, on Dolores and 18th St., the palm tree studded Dolores Park ('Dolores Beach' to sunbathers) still has a Spanish flavor.",
  places: [
    {
      name: "Alhamra",
      address: "3083 16th Street",
      category: "Restaurants",
      goodStuff: "Meat, seafood & vegetarian curries, plus tandoori & more in a simple, tiled space.",
      openingHour: "11:30 AM",
      closingHour: "10:00 PM",
    },
    {
      name: "Forein Cinema",
      address: "2534 Mission Street",
      category: "Entertainment",
      goodStuff: "Very cool little private spot with an outdoor patio between two buildings, where movies are projected on the wall  while you're having dinner.",
      openingHour: "5:30 AM",
      closingHour: "10:00 PM",
    },
    {
      name: "Mission Dolores Park",
      address: "19th & Dolores St",
      category: "Park",
      goodStuff: "Many festivals, performances, and other cultural events are held here, and on sunny afternoons people flock to the park to play, picnic, lounge, walk their dogs, and enjoy spectacular views of the city’s skyline and beyond.",
      openingHour: "6:00 AM",
      closingHour: "10:00 PM",
    }
  ],
  imageUrl: "images/dolorespark.jpg"
});
neighborhoodsList.push({
  name: "Japantown",
  description: "A neighborhood predictably packed with pretty architecture and plenty of culture, Japantown in San Francisco is a lively and colorful destination for both living and playing. There’s almost always something to do here, whether shopping in lively Japan Center (which houses dozens of restaurants and the largest Japanese bookstore in the US) or in the odd shops of the streets adjacent to the Center, or hitting up events like the Cherry Blossom Festival. By virtue of the Japan Center Garage, affordable parking is shockingly convenient in this slice of San Francisco.",
  places:[
    {
      name: "Nijiya Market",
      address: "1737 Post Street",
      category: "Grocery Store",
      goodStuff: "Japanese supermarket with vegetables, meat, fish & sushi, dry goods & a bakery.",
      openingHour: "10:00 AM",
      closingHour: "8:00 PM",
    },
    {
      name: "Festa",
      address: "1825A Post St, Suite 210",
      category: "Bar",
      goodStuff: "State-of-the-art Karaoke,over 120,000 English, Japanese, Korean, Chinese and Spanish songs",
      openingHour: "7:30 PM",
      closingHour: "1:00 AM",
    },
    {
      name: "Isubune",
      address: "1737 Post St",
      category: "Restaurant",
      goodStuff: "Sushi Boats Bar",
      openingHour: "11:30 AM",
      closingHour: "9:30 PM",
    }
  ],
  imageUrl: "images/japantown.jpg"
});
neighborhoodsList.push({
  name: "The Castro",
  description: "The universally agreed Mecca of gay life is San Francisco's Castro District. The affluent North side of Market is home to a predominantly gay and lesbian community, excellent bakeries, boutiques, cafes, restaurants, and of course, gender bending bars. The famed Castro Theatre, the Castro's historic art deco movie palace, screens old and independent films from around the world. On Halloween, the center of San Francisco is the Castro, with crowds in the thousands celebrating in the streets.",
  places: [
    {
      name: "Castro Theatre",
      address: "429 Castro Street",
      category: "Entertainment",
      goodStuff: "The Castro Theatre is a popular San Francisco movie palace which became San Francisco Historic Landmark #100 in September 1976.",
      openingHour: "N/A",
      closingHour: "N/A",
    },
    {
      name: "Tartine Bakery",
      address: "600 Guerrero Street",
      category: "Bakery",
      goodStuff: "Probably the best French bakery in town.",
      openingHour: "8:00 AM",
      closingHour: "7:00 PM",
    },
    {
      name: "Lookout",
      address: "3600 16th Street",
      category: "Bar",
      goodStuff: "This huge spot on 16th St houses one of SF's best-known gay bars. With great outdoor space",
      openingHour: "4:00 PM",
      closingHour: "10:00 PM",
    }
  ],
  imageUrl: "images/castro.jpg"
});

db.Neighborhood.remove({}, function(err, neighborhoods) {
    // code in here runs after all albums are removed
    db.Neighborhood.create(neighborhoodsList, function(err, neighborhoods) {
        // code in here runs after all albums are created
        if (err) {
          return console.log('ERROR', err);
        }
        console.log("all neighborhoods:", neighborhoods);
        console.log("created", neighborhoods.length, "neighborhoods");
        process.exit();
    });
});
