const { getDatabase } = require('./database');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  const db = await getDatabase();

  // Check if shows already exist
  const existingShows = await db.get('SELECT COUNT(*) as count FROM shows');
  
  if (existingShows.count > 0) {
    console.log('Database already seeded');
    return;
  }

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  await db.run(
    `INSERT INTO users (email, password, name, phone, deviceId) 
     VALUES (?, ?, ?, ?, ?)`,
    ['demo@example.com', hashedPassword, 'Demo User', '+1234567890', 'demo_device_001']
  );

  // Insert sample shows
  const shows = [
    {
      genre: 'Musical',
      title: 'Book of Mormon',
      image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/bookofmormon.png',
      url: 'https://nativescript.org/images/ngconf/book-of-mormon.mov',
      description: 'A satirical examination of the beliefs and practices of The Church of Jesus Christ of Latter-day Saints.',
      ticketPrice: 89.99,
      duration: 150
    },
    {
      genre: 'Musical',
      title: 'Beetlejuice',
      image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/beetlejuice.png',
      url: 'https://nativescript.org/images/ngconf/beetlejuice.mov',
      description: 'A deceased couple looks for help from a devious bio-exorcist to handle their haunted house.',
      ticketPrice: 79.99,
      duration: 200
    },
    {
      genre: 'Musical',
      title: 'Anastasia',
      image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/anastasia.png',
      url: 'https://nativescript.org/images/ngconf/anastasia.mov',
      description: 'The legend of Grand Duchess Anastasia Nikolaevna of Russia.',
      ticketPrice: 69.99,
      duration: 180
    },
  {
    genre: 'Musical',
    title: 'Hamilton',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/hamilton.png',
    url: 'https://www.youtube.com/watch?v=oHiMCgzMrDg',
    ticketPrice: 69.99,
    duration: 180,
    description: 'A groundbreaking hip-hop musical about the life of Alexander Hamilton.',
  },
  {
    genre: 'Musical',
    title: 'The Lion King',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/lionking.png',
    url: 'https://www.youtube.com/watch?v=EW0cP3m9G8M',
          ticketPrice: 69.99,
          duration: 180,
    description: 'Disney’s award-winning musical based on the animated film.',
  },
  {
    genre: 'Musical',
    title: 'Wicked',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/wicked.png',
    url: 'https://www.youtube.com/watch?v=3g4eksl1JY8',
          ticketPrice: 69.99,
          duration: 180,
    description: 'The untold story of the witches of Oz before Dorothy arrived.',
  },
  {
    genre: 'Musical',
    title: 'Chicago',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/chicago.png',
    url: 'https://www.youtube.com/watch?v=qrrz54UtkCc',
          ticketPrice: 69.99,
          duration: 180,
    description: 'A jazz-age musical about fame, crime, and corruption.',
  },
  {
    genre: 'Musical',
    title: 'Moulin Rouge! The Musical',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/moulinrouge.png',
    url: 'https://www.youtube.com/watch?v=glVsJ8zWJmA',
          ticketPrice: 69.99,
          duration: 180,
    description: 'A dazzling adaptation of Baz Luhrmann’s film.',
  },
  {
    genre: 'Musical',
    title: 'Aladdin',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/aladdin.png',
    url: 'https://www.youtube.com/watch?v=-60o7HP7-XE',
          ticketPrice: 69.99,
          duration: 180,
    description: 'Disney’s magical musical adventure based on the classic animated movie.',
  },
  {
    genre: 'Musical',
    title: 'MJ The Musical',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/mjthemusical.png',
    url: 'https://www.youtube.com/watch?v=K0m8C7M2N7A',
          ticketPrice: 69.99,
          duration: 180,
    description: 'A musical celebrating the artistry of Michael Jackson.',
  },
  {
    genre: 'Musical',
    title: 'Hadestown',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/hadestown.png',
    url: 'https://www.youtube.com/watch?v=u-LzVEOPD88',
          ticketPrice: 69.99,
          duration: 180,
    description: 'A folk-opera retelling of Orpheus and Eurydice.',
  },
  {
    genre: 'Musical',
    title: 'Sweeney Todd',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/sweeneytodd.png',
    url: 'https://www.youtube.com/watch?v=Z7D3OptJO-Q',
          ticketPrice: 69.99,
          duration: 180,
    description: 'Stephen Sondheim’s dark musical thriller set in Victorian London.',
  },
  {
    genre: 'Musical',
    title: 'Cabaret',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/cabaret.png',
    url: 'https://www.youtube.com/watch?v=0c2sx47p31M',
          ticketPrice: 69.99,
          duration: 180,
    description: 'A revival of the classic musical set in 1930s Berlin.',
  },
  {
    genre: 'Play',
    title: 'Harry Potter and the Cursed Child',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/harrypotter.png',
    url: 'https://www.youtube.com/watch?v=6oW8TcbGvdU',
	          ticketPrice: 69.99,
          duration: 180,
    description: 'A stage sequel to the Harry Potter series.',
  },
  {
    genre: 'Play',
    title: 'The Play That Goes Wrong',
    image: 'https://raw.githubusercontent.com/carlosmgalvis/Coursera/refs/heads/main/NativeScript/template-drawer-navigation/MyApp/src/assets/playthatgoeswrong.png',
    url: 'https://www.youtube.com/watch?v=f8Q5kMZ8vzk',
	ticketPrice: 69.99,
    duration: 180,
    description: 'A comedy about a disastrous amateur theater production.',
  }
  ];

  for (const show of shows) {
    const result = await db.run(
      `INSERT INTO shows (genre, title, image, url, description, ticketPrice, duration)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [show.genre, show.title, show.image, show.url, show.description, show.ticketPrice, show.duration]
    );
    
    const showId = result.lastID;
    
    // Insert show details based on title
    let details = [];
    if (show.title === 'Book of Mormon') {
      details = [
        { title: 'Music, Lyrics and Book by', body: 'Trey Parker, Robert Lopez, and Matt Stone' },
        { title: 'First showing on Broadway', body: 'March 2011 after nearly seven years of development.' },
        { title: 'Revenue', body: 'Grossed over $500 million, making it one of the most successful musicals of all time.' }
      ];
    } else if (show.title === 'Beetlejuice') {
      details = [
        { title: 'Music and Lyrics', body: 'Eddie Perfect' },
        { title: 'Book by', body: 'Scott Brown and Anthony King' },
        { title: 'Based on', body: 'A 1988 film of the same name.' },
        { title: 'First showing on Broadway', body: 'April 25, 2019' }
      ];
    } else if (show.title === 'Anastasia') {
      details = [
        { title: 'Music and Lyrics', body: 'Lynn Ahrens and Stephen Flaherty' },
        { title: 'Book by', body: 'Terrence McNally' },
        { title: 'Based on', body: 'A 1997 film of the same name.' }
      ];
    } else if (show.title === 'Hamilton'){
    details: [
      {
        title: 'Music and Lyrics',
        body: 'Lin-Manuel Miranda'
      },
      {
        title: 'Broadway Debut',
        body: 'Premiered in 2015 at the Richard Rodgers Theatre'
      }
    ];
    } else if (show.title === 'The Lion King'){
    details: [
      {
        title: 'Director',
        body: 'Julie Taymor became the first woman to win a Tony Award for Best Direction of a Musical.'
      },
      {
        title: 'Broadway Success',
        body: 'The Lion King remains one of the highest-grossing Broadway productions.'
      }
    ];
    } else if (show.title === 'Wicked'){
    details: [
      {
        title: 'Music and Lyrics',
        body: 'Stephen Schwartz'
      },
      {
        title: 'Broadway Opening',
        body: 'Opened in 2003 at the Gershwin Theatre'
      }
    ];
    } else if (show.title === 'Chicago'){
    details: [
      {
        title: 'Music',
        body: 'John Kander'
      },
      {
        title: 'Lyrics',
        body: 'Fred Ebb'
      }
    ];
    } else if (show.title === 'Moulin Rouge! The Musical'){
    details: [
      {
        title: 'Awards',
        body: 'Won multiple Tony Awards'
      },
      {
        title: 'Broadway Theatre',
        body: 'Al Hirschfeld Theatre'
      }
    ];
    } else if (show.title === 'Aladdin'){
    details: [
      {
        title: 'Music',
        body: 'Alan Menken'
      },
      {
        title: 'Broadway Opening',
        body: 'Opened in 2014'
      }
    ];
    } else if (show.title === 'MJ The Musical'){
    details: [
      {
        title: 'Storyline',
        body: 'The show focuses on the creation of Jackson’s Dangerous World Tour.'
      },
      {
        title: 'Tony Awards',
        body: 'MJ won four Tony Awards in 2022.'
      }
    ];
    } else if (show.title === 'Hadestown'){
    details: [
      {
        title: 'Creator',
        body: 'Anaïs Mitchell'
      },
      {
        title: 'Tony Award',
        body: 'Best Musical in 2019'
      }
    ];
    } else if (show.title === 'Sweeney Todd'){
    details: [
      {
        title: 'Plot',
        body: 'A barber seeks revenge with deadly consequences.'
      },
      {
        title: 'Music',
        body: 'Features one of Sondheim’s most acclaimed scores.'
      }
    ];
    } else if (show.title === 'Cabaret'){
    details: [
      {
        title: 'Themes',
        body: 'Cabaret explores politics, love, and decadence.'
      },
      {
        title: 'Venue',
        body: 'Performed in a transformed August Wilson Theatre.'
      }
    ];
    } else if (show.title === 'Harry Potter and the Cursed Child'){
    details: [
      {
        title: 'Story',
        body: 'Follows Harry Potter’s son Albus at Hogwarts'
      },
      {
        title: 'Awards',
        body: 'Won several Tony Awards'
      }
    ];
    } else if (show.title === 'The Play That Goes Wrong') {
    details: [
      {
        title: 'Comedy Style',
        body: 'The play uses slapstick and physical humor.'
      },
      {
        title: 'Broadway Run',
        body: 'It became a long-running Broadway comedy hit.'
      }
    ];
  }
    
    for (let i = 0; i < details.length; i++) {
      await db.run(
        `INSERT INTO show_details (showId, title, body, displayOrder)
         VALUES (?, ?, ?, ?)`,
        [showId, details[i].title, details[i].body, i]
      );
    }

    // Insert schedules for next 30 days
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const scheduleDate = new Date(today);
      scheduleDate.setDate(today.getDate() + i);
      
      // Add 3 showtimes per day
      const showtimes = ['14:00', '17:00', '20:00'];
      for (const showtime of showtimes) {
        const [hours, minutes] = showtime.split(':');
        scheduleDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        await db.run(
          `INSERT INTO show_schedules (showId, scheduleDateTime, availableTickets, totalTickets)
           VALUES (?, ?, ?, ?)`,
          [showId, scheduleDate.toISOString(), 100, 100]
        );
      }
    }
  }

  console.log('Database seeded successfully');
}

// Run the seed function
seedDatabase().catch(console.error);