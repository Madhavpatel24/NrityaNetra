// Content for the dance-form pages. Photographs live in /public.
export type Dance = {
  slug: string
  name: string
  state: string
  kind: "Classical" | "Folk"
  tagline: string
  intro: string
  hero: string
  native: { lang: string; text: string; gloss: string }
  history: { title: string; paras: string[]; image: string }[]
  philosophy: {
    main: { title: string; body: string }
    coreTitle: string
    core: [string, string][]
    third: { title: string; body: string }
  }
  techIntro: string
  techniques: { name: string; description: string; image: string; examples: string[] }[]
  techNote: { title: string; body: string }
  importance: { title: string; body: string }[]
  closing: string
}

export const DANCES: Record<string, Dance> = {
  "bhangra": {
    "slug": "bhangra",
    "name": "Bhangra",
    "state": "Punjab",
    "kind": "Folk",
    "tagline": "The Dance of Harvest & Celebration",
    "intro": "A vibrant folk dance from Punjab that celebrates the harvest season with explosive energy, rhythmic footwork, and joyful expressions of thanksgiving and collective celebration.",
    "hero": "/bhangra-energetic-dance-performance-punjab.jpg",
    "native": {
      "lang": "Punjabi",
      "text": "ਭੰਗੜਾ — ਵਾਢੀ ਦੀ ਖ਼ੁਸ਼ੀ ਦਾ ਨਾਚ।",
      "gloss": "Bhangra: the dance of harvest joy."
    },
    "history": [
      {
        "title": "Harvest Festival Traditions",
        "paras": [
          "Bhangra originated in Punjab as a celebration of the Baisakhi harvest festival. Farmers would dance with joy and thanksgiving after completing the successful harvest, expressing gratitude to the land and the sky.",
          "The word \"Bhangra\" comes from the oil seeds harvested during this season. What began as spontaneous celebrations in fields evolved into organized performances and a distinct cultural art form."
        ],
        "image": "/bhangra-harvest-celebration-festival.jpg"
      },
      {
        "title": "Global Evolution",
        "paras": [
          "From village celebrations to international stages, Bhangra has undergone remarkable transformation. In the 1970s and 80s, diaspora communities blended Bhangra with Western music, creating fusion forms that captivated global audiences.",
          "Today, Bhangra is performed at weddings, concerts, and festivals worldwide, maintaining its celebratory spirit while embracing contemporary musical influences and choreography."
        ],
        "image": "/bhangra-modern-fusion-contemporary.jpg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "Joy & Gratitude",
        "body": "Bhangra embodies the philosophy of celebrating life's victories and expressing gratitude for abundance. It's a dance that celebrates hard work, successful harvests, and the resilience of agricultural communities."
      },
      "coreTitle": "Core Philosophies",
      "core": [
        [
          "Harvest Victory:",
          "Celebration of successful agriculture"
        ],
        [
          "Communal Joy:",
          "Sharing success with the community"
        ],
        [
          "Vitality:",
          "Exuberant celebration of life force"
        ]
      ],
      "third": {
        "title": "Energetic Expression",
        "body": "Bhangra is uninhibited and exuberant—a physical manifestation of joy and freedom. It celebrates the body's power to express emotion and the spirit's capacity to find happiness in simple moments of togetherness."
      }
    },
    "techIntro": "Bhangra is characterized by its explosive energy and powerful movements. The dance combines high-energy footwork, vigorous upper body movements, and the distinctive shoulder shimmy that defines the form.",
    "techniques": [
      {
        "name": "Bhangra Step (Gidda)",
        "description": "The signature high-energy stepping pattern with bending knees and springy movements",
        "image": "/bhangra-energetic-dance-performance-punjab.jpg",
        "examples": [
          "High knees",
          "Springy bounce",
          "Rhythmic jumps"
        ]
      },
      {
        "name": "Dhol Rhythm",
        "description": "Dancers move to the powerful beat of the dhol drum, the heartbeat of Bhangra",
        "image": "/bhangra-traditional-dhol-drum-rhythm.jpg",
        "examples": [
          "Drum synchronization",
          "Beat following",
          "Rhythmic timing"
        ]
      },
      {
        "name": "Shoulder Shaking",
        "description": "Characteristic shoulder and upper body movements that add vibrancy and energy",
        "image": "/bhangra-joy-celebration-movement.jpg",
        "examples": [
          "Shoulder rolls",
          "Upper body sway",
          "Dynamic movement"
        ]
      },
      {
        "name": "Festive Expression",
        "description": "Joyful facial expressions and body language conveying celebration and victory",
        "image": "/bhangra-colorful-folk-costume-tradition.jpg",
        "examples": [
          "Enthusiastic energy",
          "Celebratory mood",
          "Victory expressions"
        ]
      }
    ],
    "techNote": {
      "title": "Pure Exuberance",
      "body": "Bhangra's defining characteristic is its uninhibited energy and pure exuberance. Unlike forms requiring technical precision, Bhangra celebrates the liberation of movement, the joy of the body in motion, and the spirit's triumph."
    },
    "importance": [
      {
        "title": "Punjabi Heritage & Pride",
        "body": "Bhangra is the heartbeat of Punjabi culture, representing the spirit, resilience, and vibrant identity of Punjab. It serves as a symbol of Punjabi pride and cultural continuity across generations."
      },
      {
        "title": "Agricultural Celebration",
        "body": "Bhangra honors agricultural communities and celebrates the connection between humans and the land. It acknowledges the hard work of farmers and the cyclical nature of harvest and renewal."
      },
      {
        "title": "Global Cultural Bridge",
        "body": "Through fusion and contemporary adaptations, Bhangra has become a bridge between traditional and modern, East and West, serving as a vehicle for cultural exchange and artistic innovation."
      },
      {
        "title": "Celebration of Life",
        "body": "Bhangra's primary importance lies in its universal message—that life is worth celebrating, that joy is worth sharing, and that community is where strength and happiness truly reside."
      }
    ],
    "closing": "Bhangra is where the heart explodes into movement—a dance of victory, gratitude, and the unstoppable joy of being alive and free."
  },
  "bharatanatyam": {
    "slug": "bharatanatyam",
    "name": "Bharatanatyam",
    "state": "Tamil Nadu",
    "kind": "Classical",
    "tagline": "The Dance of Divine Expression",
    "intro": "An ancient classical dance form from Tamil Nadu that weaves together storytelling, rhythm, devotion, and intricate mudras into a complete language of movement.",
    "hero": "/Bharatanatyam-A-Deep-Dive-History-Meaning-and-Evolution.jpeg.jpg",
    "native": {
      "lang": "Tamil",
      "text": "பரதநாட்டியம் — கை, கண், மனம், உணர்வு ஒன்றாகும் கலை.",
      "gloss": "Bharatanatyam: the art where hand, eye, mind and feeling become one."
    },
    "history": [
      {
        "title": "Temple Traditions",
        "paras": [
          "Bharatanatyam emerged in the temples of Tamil Nadu during the Chola period. Devadasis, the temple dancers, offered their art as worship, blending devotion with technical mastery.",
          "Their performances formed an essential part of temple rituals, festivals, and storytelling traditions, preserving mythological narratives through movement."
        ],
        "image": "/ancient-indian-temple-architecture-bharatnatyam.jpg"
      },
      {
        "title": "Revival & Modern Era",
        "paras": [
          "Colonial attitudes led to the decline of temple dance. Visionaries like Rukmini Devi Arundale and Balasaraswati revived Bharatanatyam in the 20th century, bringing it to the proscenium stage.",
          "Today, Bharatanatyam is a global art form, taught and performed across the world while still rooted in its sacred origins."
        ],
        "image": "/bharatnatyam-classical-dance-evolution-history.jpg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "Natyashastra Foundation",
        "body": "Bharatanatyam is deeply rooted in the Natyashastra, the ancient Sanskrit text by Bharata Muni that outlines the theory of drama, dance, and music. It emphasizes the union of body, mind, and spirit and the communication of rasa—emotional flavor—to the audience."
      },
      "coreTitle": "Three Core Elements",
      "core": [
        [
          "Angika:",
          "Physical movement and posture"
        ],
        [
          "Vachika:",
          "Expression and spoken / sung word"
        ],
        [
          "Satvika:",
          "Inner emotional experience"
        ]
      ],
      "third": {
        "title": "Spiritual Practice",
        "body": "Beyond performance, Bharatanatyam can be a meditative and devotional practice. Through abhinaya (expression), the dancer channels stories of love, longing, heroism, and surrender to the divine."
      }
    },
    "techIntro": "Mudras form the core vocabulary of Bharatanatyam. With a rich system of single-hand and double-hand gestures, dancers can depict everything from deities and nature to emotions and daily life.",
    "techniques": [
      {
        "name": "Asamyuta Hastas",
        "description": "Single-hand gestures used to depict objects, actions, and emotions",
        "image": "/bharatnatyam-single-hand-mudra-gesture.jpg",
        "examples": [
          "Pataka (Flag)",
          "Tripataka (Three-fold)",
          "Mushti (Fist)"
        ]
      },
      {
        "name": "Samyuta Hastas",
        "description": "Two-hand gestures that create combined meanings and deeper expressions",
        "image": "/bharatnatyam-two-hand-mudra-gesture.jpg",
        "examples": [
          "Anjali (Prayer)",
          "Kapota (Dove)",
          "Makara (Crocodile)"
        ]
      },
      {
        "name": "Nrittas",
        "description": "Pure dance movements without specific meaning, focused on rhythm and grace",
        "image": "/bharatnatyam-dance-movement-rhythm.jpg",
        "examples": [
          "Jatis",
          "Korvais",
          "Tirmanas"
        ]
      },
      {
        "name": "Rasas",
        "description": "Nine emotional states expressed through facial expressions and body language",
        "image": "/bharatnatyam-emotional-expression-rasa.jpg",
        "examples": [
          "Sringara (Love)",
          "Hasya (Joy)",
          "Raudra (Anger)"
        ]
      }
    ],
    "techNote": {
      "title": "The Language of Dance",
      "body": "Through mudras, the dancer can narrate epics, portray gods and goddesses, and express subtle inner states without speaking a single word. Bharatanatyam transforms gesture into poetry in motion."
    },
    "importance": [
      {
        "title": "Spiritual Heritage",
        "body": "Bharatanatyam preserves ancient philosophical ideas and devotional practices, keeping alive stories and values passed down through generations."
      },
      {
        "title": "Social & Cultural Empowerment",
        "body": "The 20th-century revival opened doors for women and artists from diverse backgrounds, making Bharatanatyam a symbol of cultural pride and self-expression."
      },
      {
        "title": "Global Reach",
        "body": "From Chennai to New York, Bharatanatyam is now performed on global stages, acting as a cultural bridge and introducing audiences worldwide to Indian aesthetics and philosophy."
      },
      {
        "title": "Holistic Development",
        "body": "Training in Bharatanatyam builds stamina, coordination, musicality, memory, and emotional awareness—nurturing both artistic excellence and personal growth."
      }
    ],
    "closing": "Bharatanatyam is more than dance—it is a living tradition that celebrates the beauty of Indian heritage and the infinite possibilities of human expression."
  },
  "garba": {
    "slug": "garba",
    "name": "Garba",
    "state": "Gujarat",
    "kind": "Folk",
    "tagline": "The Dance of Community & Joy",
    "intro": "A vibrant folk dance form from Gujarat that celebrates the beauty of community, the joy of celebration, and the spirit of togetherness through circular formations and rhythmic hand movements.",
    "hero": "/garba-traditional-circular-dance-group.jpg",
    "native": {
      "lang": "Gujarati",
      "text": "ગરબા — માતાજીની આરાધનાનો ઉત્સવ.",
      "gloss": "Garba: a celebration in worship of the Mother Goddess."
    },
    "history": [
      {
        "title": "Ancient Devotional Dance",
        "paras": [
          "Garba originated in Gujarat as a devotional dance performed during Navratri (nine nights) festival celebrations honoring the Divine Mother, Durga. The word \"Garba\" means womb, symbolizing the nurturing power of the goddess.",
          "Traditionally performed around a lit lamp (diya) in circular formations, Garba became a community celebration that brought people together through joyful movement and collective festivity."
        ],
        "image": "/garba-folk-festival-raas-dance.jpg"
      },
      {
        "title": "Contemporary Evolution",
        "paras": [
          "From village squares to concert stages, Garba has evolved dramatically while maintaining its festive spirit. Modern choreographers blend traditional steps with contemporary music and staging.",
          "Today, Garba is celebrated not just in Gujarat but globally, with Navratri celebrations featuring Garba competitions and performances in major cities worldwide."
        ],
        "image": "/garba-modern-contemporary-stage.jpg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "Celebration of Unity",
        "body": "Garba embodies the philosophy of collective joy and unity. The circular formation has no beginning or end, symbolizing the eternal cycle of life, the continuity of tradition, and the interconnectedness of community."
      },
      "coreTitle": "Core Meanings",
      "core": [
        [
          "Durga Worship:",
          "Devotion to the Divine Mother"
        ],
        [
          "Collective Joy:",
          "Happiness multiplied through community"
        ],
        [
          "Cyclical Time:",
          "The eternal dance of creation and renewal"
        ]
      ],
      "third": {
        "title": "Festival Spirit",
        "body": "Garba celebrates life itself—fertility, abundance, and the triumph of good over evil. It's a dance of celebration that invites everyone, regardless of age or background, to participate in collective joy."
      }
    },
    "techIntro": "Garba's technique combines rhythmic footwork, synchronized hand movements, and expressive body language. The dance is characterized by quick steps, swaying hips, and hand clapping that creates the musical pulse.",
    "techniques": [
      {
        "name": "Circular Formation",
        "description": "Dancers move in concentric circles, creating a sense of community and collective joy",
        "image": "/garba-traditional-circular-dance-group.jpg",
        "examples": [
          "Spinning circles",
          "Group harmony",
          "Unified movement"
        ]
      },
      {
        "name": "Hand Clapping (Tal)",
        "description": "Rhythmic hand clapping synchronized with footwork, creating the pulse and energy",
        "image": "/garba-hand-gestures-mudra-choreography.jpg",
        "examples": [
          "Synchronized claps",
          "Rhythmic patterns",
          "Musical coordination"
        ]
      },
      {
        "name": "Footwork & Hip Movements",
        "description": "Quick, energetic footsteps combined with graceful hip and body movements",
        "image": "/garba-folk-festival-raas-dance.jpg",
        "examples": [
          "Quick steps",
          "Swaying hips",
          "Joyful movements"
        ]
      },
      {
        "name": "Costume & Expression",
        "description": "Colorful traditional attire with expressive facial expressions conveying joy and celebration",
        "image": "/garba-colorful-chaniya-choli-costume.jpg",
        "examples": [
          "Chaniya choli",
          "Bright colors",
          "Festive energy"
        ]
      }
    ],
    "techNote": {
      "title": "Infectious Energy",
      "body": "Garba is characterized by its infectious energy and participatory nature. Unlike some classical forms that emphasize perfection, Garba celebrates the joy of dancing together, making it accessible and welcoming to all."
    },
    "importance": [
      {
        "title": "Feminine Divine Celebration",
        "body": "Garba honors the Divine Mother in her many forms, serving as a powerful celebration of feminine energy, strength, and nurturing power central to Hindu philosophy."
      },
      {
        "title": "Social Cohesion",
        "body": "Garba's circular formation and participatory nature strengthen community bonds, bringing together people of all ages, genders, and backgrounds in celebration of shared cultural heritage."
      },
      {
        "title": "Cultural Pride",
        "body": "Garba represents the vibrant cultural identity of Gujarat, serving as a symbol of Gujarati traditions and celebrating the region's artistic heritage on national and international stages."
      },
      {
        "title": "Accessibility & Inclusivity",
        "body": "Unlike classical forms requiring years of training, Garba welcomes everyone to participate, making dance a shared cultural expression accessible to entire communities regardless of skill level."
      }
    ],
    "closing": "Garba is where tradition becomes celebration—a dance of joy that reminds us of the power of community, the beauty of togetherness, and the eternal cycle of life."
  },
  "kathak": {
    "slug": "kathak",
    "name": "Kathak",
    "state": "North India",
    "kind": "Classical",
    "tagline": "The Dance of Stories and Rhythm",
    "intro": "A vibrant classical dance form from North India that blends rapid footwork, intricate rhythmic patterns, and expressive storytelling into a dynamic performance art.",
    "hero": "/kathak-classical-dancer-performing.jpg",
    "native": {
      "lang": "Hindi",
      "text": "कथक — कहानी कहने वाली कला।",
      "gloss": "Kathak: the art of the storyteller."
    },
    "history": [
      {
        "title": "Court Tradition",
        "paras": [
          "Kathak originated in North India as a court performance art in the royal courts of Mughal emperors. The word \"Kathak\" comes from \"Katha,\" meaning story.",
          "Dancers called Kathaks would narrate tales of mythology, romance, and valor through a combination of rhythmic footwork, gestures, and facial expressions, entertaining nobility and nobility alike."
        ],
        "image": "/kathak-mughal-court-architecture.jpg"
      },
      {
        "title": "Transformation & Modernity",
        "paras": [
          "After the decline of court patronage, Kathak transitioned from palaces to concert stages. Maestros like PT. Lachhu Maharaj and Pt. Birju Maharaj revolutionized the form.",
          "Today, Kathak thrives as a concert form, maintaining its unique blend of rhythmic virtuosity and narrative depth while continuing to evolve with contemporary interpretations."
        ],
        "image": "/kathak-dance-evolution-history.jpg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "The Art of Storytelling",
        "body": "Kathak is fundamentally a narrative art form. Through a sophisticated language of movement, rhythm, and expression, the dancer weaves stories that captivate audiences, transforming abstract emotion into tangible movement."
      },
      "coreTitle": "Key Philosophies",
      "core": [
        [
          "Laya:",
          "Rhythmic flow and temporal progression"
        ],
        [
          "Abhinaya:",
          "Expressive storytelling through gesture"
        ],
        [
          "Nritta:",
          "Pure rhythmic dance patterns"
        ]
      ],
      "third": {
        "title": "The Performer's Spirit",
        "body": "A Kathak dancer must master both the mathematical precision of rhythm and the emotional nuance of expression, embodying both the scientist and the poet."
      }
    },
    "techIntro": "Kathak is renowned for its intricate rhythmic vocabulary and expressive techniques. The combination of rapid footwork, hand gestures, and facial expressions creates a unique movement language.",
    "techniques": [
      {
        "name": "Taal (Rhythm)",
        "description": "Complex rhythmic cycles that form the foundation of Kathak's temporal structure",
        "image": "/kathak-rhythm-taal-tabla.jpg",
        "examples": [
          "Teental (16 beats)",
          "Jhaptal (10 beats)",
          "Rupak (7 beats)"
        ]
      },
      {
        "name": "Bol (Verbal Syllables)",
        "description": "Mnemonic syllables recited to create rhythm patterns and storytelling sequences",
        "image": "/kathak-bol-recitation-dancer.jpg",
        "examples": [
          "Ta-jha-nu",
          "Dha-ge-na",
          "Tat-tai-jha-nu"
        ]
      },
      {
        "name": "Chakri & Paran",
        "description": "Intricate footwork patterns combined with rhythmic syllables and spins",
        "image": "/kathak-footwork-chakri-spin.jpg",
        "examples": [
          "Gaida-paran",
          "Chakradar",
          "Ladi"
        ]
      },
      {
        "name": "Hastas & Mudras",
        "description": "Hand gestures that narrate stories and express emotional states with precision",
        "image": "/kathak-hastas-hand-gestures.jpg",
        "examples": [
          "Tribhanga",
          "Aramandi",
          "Samapada-sthana"
        ]
      }
    ],
    "techNote": {
      "title": "The Rhythm Revolution",
      "body": "Kathak's hallmark is its breathtaking footwork and rhythmic complexity. Dancers execute intricate patterns at remarkable speeds, all while maintaining emotional expression—a balance that defines Kathak excellence."
    },
    "importance": [
      {
        "title": "Musical & Rhythmic Legacy",
        "body": "Kathak has deeply influenced North Indian classical music and is a laboratory for rhythmic innovation, with its complex taals and improvisational frameworks inspiring musicians across generations."
      },
      {
        "title": "Courtly Elegance & Refinement",
        "body": "Rooted in court traditions, Kathak represents a refined aesthetic that blends intellectual rigor with sensual grace, making it a symbol of artistic sophistication and cultural excellence."
      },
      {
        "title": "Living Narrative Tradition",
        "body": "By preserving storytelling traditions and mythological narratives, Kathak keeps alive the oral heritage and philosophical wisdom of Indian civilization in a dynamic, ever-evolving form."
      },
      {
        "title": "Contemporary Relevance",
        "body": "Modern Kathak continues to inspire collaborations, contemporary choreography, and fusion projects, proving that tradition and innovation can coexist beautifully in artistic expression."
      }
    ],
    "closing": "Kathak is a living art form where rhythm and story dance together, creating moments of pure enchantment and intellectual brilliance."
  },
  "kathakali": {
    "slug": "kathakali",
    "name": "Kathakali",
    "state": "Kerala",
    "kind": "Classical",
    "tagline": "The Dance of Gods and Legends",
    "intro": "A grand theatrical dance form from Kerala that combines elaborate costumes, intricate makeup, powerful movements, and mythological narratives into an immersive visual spectacle.",
    "hero": "/kathakali-performer-makeup-costume.jpg",
    "native": {
      "lang": "Malayalam",
      "text": "കഥകളി — കഥ കളിയായി മാറുന്ന കല.",
      "gloss": "Kathakali: the art where a story becomes play."
    },
    "history": [
      {
        "title": "Kerala's Treasure",
        "paras": [
          "Kathakali emerged in Kerala during the 16th century as a performance art deeply rooted in temple rituals and royal patronage. The name means \"story-play\" in Malayalam.",
          "Performers would train for decades to master the elaborate makeup, costumes, precise movements, and complex emotional expressions required to bring mythological characters to life."
        ],
        "image": "/kathakali-kerala-temple-architecture.jpg"
      },
      {
        "title": "Evolution & Global Recognition",
        "paras": [
          "Once performed exclusively in temples and courts, Kathakali transitioned to concert stages in the 20th century while retaining its ceremonial grandeur and spiritual depth.",
          "Today, Kathakali is recognized as one of the world's most distinctive theatrical forms, captivating international audiences with its unparalleled visual richness and narrative power."
        ],
        "image": "/kathakali-traditional-performance-stage.jpg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "Total Theater Experience",
        "body": "Kathakali is a complete sensory experience where every element—from the green and red face paint to the golden headpiece, from the powerful leg movements to the subtle hand gestures—combines to create a unified artistic statement."
      },
      "coreTitle": "Character Archetypes",
      "core": [
        [
          "Pacha:",
          "Green face (divine, virtuous characters)"
        ],
        [
          "Kathi:",
          "Red face (fierce, warrior characters)"
        ],
        [
          "Minukku:",
          "Yellow face (noble, feminine characters)"
        ]
      ],
      "third": {
        "title": "Spiritual Transformation",
        "body": "The performer undergoes a profound transformation, both physically and spiritually. Through rigorous preparation, the dancer becomes the mythological character, channeling divine energy onto the stage."
      }
    },
    "techIntro": "Kathakali uses a sophisticated vocabulary of hand gestures and facial expressions to narrate complex stories. Each mudra and eye movement carries specific meaning and emotional weight.",
    "techniques": [
      {
        "name": "Makara",
        "description": "Represents crocodile, used to depict water creatures and specific emotions",
        "image": "/kathakali-makara-mudra.jpg",
        "examples": [
          "Crocodile attack",
          "Swimming",
          "Water creatures"
        ]
      },
      {
        "name": "Vardhana",
        "description": "Depicts growth and expansion, used in narratives of abundance",
        "image": "/kathakali-vardhana-mudra.jpg",
        "examples": [
          "Growing flowers",
          "Prosperity",
          "Abundance"
        ]
      },
      {
        "name": "Katakamukha",
        "description": "Represents gaping mouth of a tiger or lion, expressing danger and power",
        "image": "/kathakali-tiger-mouth-mudra.jpg",
        "examples": [
          "Tiger roar",
          "Threat",
          "Power"
        ]
      },
      {
        "name": "Eye Movements (Drishtis)",
        "description": "Complex eye expressions that convey emotions and direct narrative focus",
        "image": "/kathakali-eye-expressions.jpg",
        "examples": [
          "Love gaze",
          "Anger",
          "Wonder"
        ]
      }
    ],
    "techNote": {
      "title": "The Language of Makeup & Movement",
      "body": "In Kathakali, makeup is not mere decoration—it is a visual language. Combined with powerful leg movements and intricate hand patterns, the makeup tells you instantly which character you're watching and what emotions they're experiencing."
    },
    "importance": [
      {
        "title": "Visual Storytelling Mastery",
        "body": "Kathakali demonstrates how movement, costume, and makeup can communicate complex narratives without spoken dialogue, proving that theater transcends language barriers."
      },
      {
        "title": "Cultural Icon of Kerala",
        "body": "Kathakali is the pride of Kerala's cultural heritage, representing centuries of artistic refinement, technical excellence, and the state's unique aesthetic sensibilities."
      },
      {
        "title": "Physical & Mental Discipline",
        "body": "Training in Kathakali requires extraordinary physical stamina, mental concentration, and years of dedication. It builds strength, flexibility, and profound emotional awareness."
      },
      {
        "title": "International Artistic Bridge",
        "body": "Kathakali's grandeur and uniqueness have made it a cultural ambassador, introducing millions worldwide to Indian theatrical traditions and inspiring contemporary performers across genres."
      }
    ],
    "closing": "Kathakali is a testament to human creativity—a breathtaking fusion of art, discipline, and spiritual expression that has captivated audiences for centuries."
  },
  "kuchipudi": {
    "slug": "kuchipudi",
    "name": "Kuchipudi",
    "state": "Andhra Pradesh",
    "kind": "Classical",
    "tagline": "The Dance of Andhra Pradesh",
    "intro": "A classical dance form from Andhra Pradesh that harmoniously blends the vigor of South Indian dance, the dramatic elements of storytelling, and the technical refinement of classical tradition.",
    "hero": "/kuchipudihero.jpg",
    "native": {
      "lang": "Telugu",
      "text": "కూచిపూడి — కథను నాట్యంగా చెప్పే కళ.",
      "gloss": "Kuchipudi: the art that tells a story as dance."
    },
    "history": [
      {
        "title": "Village Performance Tradition",
        "paras": [
          "Kuchipudi originated in the village of Kuchipudi in Andhra Pradesh, emerging as a community-based performance art where entire groups would perform Hindu religious stories and epics.",
          "Originally performed by the Brahmin community as an offering to Lord Krishna, Kuchipudi evolved from ritual performances to a sophisticated classical form suitable for concert stages."
        ],
        "image": "/kuchipudivillage.jpeg"
      },
      {
        "title": "Classical Recognition",
        "paras": [
          "During the 20th century, dancers like Yakshagana practitioners and later dedicated Kuchipudi artists standardized and refined the form, gaining recognition as one of India's eight classical dances.",
          "Today, Kuchipudi performs on prestigious concert stages worldwide, showcasing the remarkable evolution from a village tradition to an internationally celebrated classical art form."
        ],
        "image": "/kuchipuditradition.jpeg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "Unity of Dance Forms",
        "body": "Kuchipudi is unique in synthesizing elements from various South Indian and North Indian classical traditions. It combines the rhythmic sophistication of Bharatanatyam with the dramatic narrative of Yakshagana."
      },
      "coreTitle": "Core Elements",
      "core": [
        [
          "Natya:",
          "Dramatic storytelling and characterization"
        ],
        [
          "Nritta:",
          "Pure rhythmic dance patterns"
        ],
        [
          "Nritya:",
          "Expressive gesture work with emotion"
        ]
      ],
      "third": {
        "title": "Versatile Expression",
        "body": "Kuchipudi dancers are trained as complete performers—equally adept at pure technical virtuosity and emotional dramatic expression, making them versatile artists capable of profound storytelling."
      }
    },
    "techIntro": "Kuchipudi technique combines strong rhythmic foundations with expressive artistry. Dancers master intricate footwork, complex hand gestures, and the ability to switch seamlessly between technical and dramatic sequences.",
    "techniques": [
      {
        "name": "Aramandi (Horse Stance)",
        "description": "The fundamental stance with knees bent and weight distributed, creating a strong foundation for all movements",
        "image": "/kuchipudiaralmandi.jpeg",
        "examples": [
          "Ground connection",
          "Power base",
          "Grounded elegance"
        ]
      },
      {
        "name": "Chari (Rhythmic Footwork)",
        "description": "Complex footwork patterns synchronized with musical rhythms, creating the pulse of movement",
        "image": "/kuchipudichari.jpeg",
        "examples": [
          "Jati patterns",
          "Rhythmic sequences",
          "Musical synchronization"
        ]
      },
      {
        "name": "Natya (Dramatic Expression)",
        "description": "Theatrical storytelling combined with pure dance, creating a unique blend of drama and technical mastery",
        "image": "/kuchinatya.jpeg",
        "examples": [
          "Character portrayal",
          "Emotional depth",
          "Narrative flow"
        ]
      },
      {
        "name": "Mudra & Hasta (Gestures)",
        "description": "Hand gestures combined with facial expressions to communicate complex narratives and emotions",
        "image": "/bharatnatyam-single-hand-mudra-gesture.jpg",
        "examples": [
          "Samyuta hastas",
          "Abhinaya",
          "Expression work"
        ]
      }
    ],
    "techNote": {
      "title": "The Bridge Form",
      "body": "Kuchipudi's unique blend of technical precision and theatrical drama makes it a bridge between pure abstract dance and narrative performance, offering audiences the best of both worlds."
    },
    "importance": [
      {
        "title": "Community & Tradition",
        "body": "Kuchipudi's origins as a community performance art make it a symbol of collaborative creativity and cultural cohesion, where art serves both spiritual and social functions."
      },
      {
        "title": "Andhra Pradesh Pride",
        "body": "Kuchipudi represents the artistic brilliance and cultural sophistication of Andhra Pradesh, contributing significantly to India's reputation as a cradle of classical performing arts."
      },
      {
        "title": "All-Round Artistry",
        "body": "Training in Kuchipudi develops complete performers who can handle complex technical sequences and nuanced dramatic roles, creating versatile artists of exceptional caliber."
      },
      {
        "title": "Contemporary Adaptability",
        "body": "Kuchipudi's blend of classical rigor and theatrical expressiveness makes it adaptable to contemporary compositions and experimental forms, keeping it relevant to modern audiences."
      }
    ],
    "closing": "Kuchipudi is where tradition meets innovation—a classical form that honors the past while embracing the possibilities of contemporary artistic expression."
  },
  "lavani": {
    "slug": "lavani",
    "name": "Lavani",
    "state": "Maharashtra",
    "kind": "Folk",
    "tagline": "The Dance of Rhythm & Social Voice",
    "intro": "A powerful folk dance form from Maharashtra known for its sensuous movements, dramatic intensity, and fearless social commentary expressed through rhythmic movement and evocative song.",
    "hero": "/modernlavani.jpg",
    "native": {
      "lang": "Marathi",
      "text": "लावणी — ढोलकीच्या तालावर रंगणारी कला.",
      "gloss": "Lavani: an art that comes alive on the beat of the dholki."
    },
    "history": [
      {
        "title": "Folk Tradition & Social Commentary",
        "paras": [
          "Lavani originated in Maharashtra as a folk dance performed primarily by lower-caste communities at festivals and celebrations. The form emerged as a powerful voice for the marginalized, expressing social issues through song and dance.",
          "Traditionally performed in groups, Lavani dancers used rhythmic movements and clever lyrics to comment on social injustice, political oppression, and romantic themes in a way that bypassed censorship."
        ],
        "image": "/lavanifestival.jpeg"
      },
      {
        "title": "Contemporary Revival",
        "paras": [
          "After periods of suppression and marginalization, Lavani experienced a revival in the 20th century as artists recognized its power as a tool for social activism and cultural expression.",
          "Today, Lavani continues to be performed in theaters and on concert stages, maintaining its role as a voice for the voiceless while gaining recognition as an important part of Indian folk culture."
        ],
        "image": "/modernlavani.jpg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "The Voice of the Voiceless",
        "body": "Lavani embodies the philosophy of using art as social commentary and political resistance. It celebrates the power of marginalized communities to express their realities, their struggles, and their defiance through movement and song."
      },
      "coreTitle": "Core Philosophies",
      "core": [
        [
          "Social Resistance:",
          "Art as tool for change"
        ],
        [
          "Sensual Power:",
          "Embodied expression of autonomy"
        ],
        [
          "Truth Telling:",
          "Fearless speech through movement"
        ]
      ],
      "third": {
        "title": "Fearless Expression",
        "body": "Lavani celebrates sensuality without apology and expresses dissent without restraint. It affirms the right of performers to own their bodies, their voices, and their stories—a profound political act."
      }
    },
    "techIntro": "Lavani's technique combines rhythmic hip movements, expressive hand gestures, and dramatic facial expressions. The form emphasizes the power of the female body as an instrument of artistic expression and social commentary.",
    "techniques": [
      {
        "name": "Rhythmic Hip Movement",
        "description": "The signature undulating hip and waist movements that create the sensuous character of Lavani",
        "image": "/lavani-rhythmic-hip-movement-dance.jpg",
        "examples": [
          "Hip sways",
          "Waist articulation",
          "Rhythmic pulses"
        ]
      },
      {
        "name": "Dramatic Expressions",
        "description": "Intense facial expressions and emotional depth conveying stories of love, loss, and social commentary",
        "image": "/lavaniexpression.jpg",
        "examples": [
          "Emotional intensity",
          "Storytelling",
          "Character portrayal"
        ]
      },
      {
        "name": "Hand Gestures & Mudras",
        "description": "Graceful hand movements combined with precise finger work to enhance narrative and expression",
        "image": "/lavanigestures.jpg",
        "examples": [
          "Mudra combinations",
          "Hand articulation",
          "Gesture precision"
        ]
      },
      {
        "name": "Social Commentary",
        "description": "The use of movement and song to address social issues and convey powerful messages",
        "image": "/Lavanisocial.jpg",
        "examples": [
          "Satirical expression",
          "Social critique",
          "Powerful messaging"
        ]
      }
    ],
    "techNote": {
      "title": "Uninhibited Power",
      "body": "Lavani's defining characteristic is its uninhibited power and fearless sensuality. The dance celebrates the body as a site of agency, resistance, and artistic expression, making each movement a statement of autonomy and power."
    },
    "importance": [
      {
        "title": "Voice of Social Justice",
        "body": "Lavani stands as a powerful tool for social activism and political commentary, giving voice to marginalized communities and addressing issues of caste, class, and gender discrimination through artistic expression."
      },
      {
        "title": "Female Empowerment & Autonomy",
        "body": "Lavani celebrates female performers and their right to control their narratives. It affirms women's agency, sensuality, and intellectual power—making it a symbol of feminist resistance and self-determination."
      },
      {
        "title": "Maharashtra Cultural Pride",
        "body": "Lavani represents the artistic and cultural identity of Maharashtra, showcasing the region's tradition of bold artistic expression and social consciousness within Indian classical and folk traditions."
      },
      {
        "title": "Art as Resistance",
        "body": "Lavani demonstrates the power of artistic expression to challenge oppression, speak truth to power, and inspire social change—making it a significant form of cultural and political resistance."
      }
    ],
    "closing": "Lavani is where the body becomes a voice—a fearless, sensual, powerful expression of resistance, truth, and the indomitable spirit of communities claiming their right to be heard."
  },
  "manipuri": {
    "slug": "manipuri",
    "name": "Manipuri",
    "state": "Manipur",
    "kind": "Classical",
    "tagline": "The Dance of Divine Love",
    "intro": "A classical dance form from Manipur that expresses the divine love between Krishna and the gopis through soft, lyrical movements and profound spiritual devotion.",
    "hero": "/manipuri-dancer-classical-performance.jpg",
    "native": {
      "lang": "Hindi",
      "text": "मणिपुरी — भक्ति और कोमलता का नृत्य।",
      "gloss": "Manipuri: a dance of devotion and tenderness."
    },
    "history": [
      {
        "title": "The Valley of Dance",
        "paras": [
          "Manipuri originated in the Manipur Valley in Northeast India, evolving as a devotional art form expressing the love of Krishna and the gopis (cowherd girls) through graceful, spiritual movements.",
          "The dance was performed during temple festivals and royal occasions, serving as a sacred offering and a medium for expressing divine love and spiritual surrender."
        ],
        "image": "/manipuri-manipur-valley-temple.jpg"
      },
      {
        "title": "Cultural Continuity",
        "paras": [
          "Unlike some classical forms, Manipuri maintained continuity through family traditions and community performances. In the 20th century, it was formally recognized as one of India's eight classical dances.",
          "Today, Manipuri dancers preserve the spirituality and lyrical grace of the form while bringing it to national and international concert stages, maintaining its sacred essence."
        ],
        "image": "/manipuri-classical-tradition.jpg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "The Language of the Heart",
        "body": "Manipuri is fundamentally a spiritual dance form expressing the longing of the soul for divine union. Through soft, lyrical movements, dancers channel the emotional intensity of bhakti—pure devotional love."
      },
      "coreTitle": "Core Philosophies",
      "core": [
        [
          "Bhakti:",
          "Devotional surrender and love"
        ],
        [
          "Laya:",
          "Internal rhythm and spiritual flow"
        ],
        [
          "Rasa:",
          "Emotional and spiritual essence"
        ]
      ],
      "third": {
        "title": "Spiritual Intimacy",
        "body": "Unlike other forms, Manipuri celebrates intimate moments of Krishna's life—the tender, personal moments between Krishna and the gopis—expressing spirituality through emotional connection and tenderness."
      }
    },
    "techIntro": "Manipuri is distinguished by its soft, undulating movements and intimate emotional expression. The form emphasizes grace, fluidity, and the ability to convey subtle spiritual states through gentle articulation.",
    "techniques": [
      {
        "name": "Ras Lila (Circle of Love)",
        "description": "The signature Manipuri form depicting Krishna's divine play and romantic pastimes with the gopis",
        "image": "/manipuri-ras-lila-circle.jpg",
        "examples": [
          "Krishna's play",
          "Gopi devotion",
          "Divine love"
        ]
      },
      {
        "name": "Chari (Rhythmic Footwork)",
        "description": "Soft, grounded footwork that connects the dancer to the earth and creates rhythmic patterns",
        "image": "/manipuri-footwork-chari.jpg",
        "examples": [
          "Ground movement",
          "Rhythmic patterns",
          "Connected dance"
        ]
      },
      {
        "name": "Soft Movements",
        "description": "Gentle, undulating movements characterized by flowing arms and a lyrical quality",
        "image": "/manipuri-soft-movements-lyrical.jpg",
        "examples": [
          "Arm waves",
          "Graceful flow",
          "Lyrical expression"
        ]
      },
      {
        "name": "Facial Expressions (Rasa)",
        "description": "Subtle yet profound facial expressions that convey deep emotions and spiritual states",
        "image": "/manipuri-facial-expressions-rasa.jpg",
        "examples": [
          "Divine love",
          "Longing",
          "Devotion"
        ]
      }
    ],
    "techNote": {
      "title": "Grace in Motion",
      "body": "Manipuri's hallmark is its gentleness—a profound softness that doesn't diminish the intensity of spiritual expression. Every movement flows naturally, creating an impression of effortless grace and divine beauty."
    },
    "importance": [
      {
        "title": "Spiritual Heritage of Northeast India",
        "body": "Manipuri is a living expression of Northeast India's spiritual traditions, preserving Krishna devotion and showcasing the region's unique artistic identity within India's classical dance heritage."
      },
      {
        "title": "Aesthetic Innovation",
        "body": "With its emphasis on softness and lyrical quality, Manipuri introduced a different aesthetic to Indian classical dance, proving that grace and power are not mutually exclusive."
      },
      {
        "title": "Female Empowerment & Performance",
        "body": "Manipuri has given women performers a platform to express spirituality and artistry, with female dancers playing central roles in both traditional and contemporary performances."
      },
      {
        "title": "Living Spiritual Practice",
        "body": "Unlike some classical forms that became purely secular, Manipuri retains its spiritual dimension, allowing dancers to experience it as both artistic practice and devotional meditation."
      }
    ],
    "closing": "Manipuri is where the soul finds expression—a gentle, profound art form that celebrates divine love through the poetry of movement and the grace of the human spirit."
  },
  "odissi": {
    "slug": "odissi",
    "name": "Odissi",
    "state": "Odisha",
    "kind": "Classical",
    "tagline": "The Dance of the Jagannatha Temple",
    "intro": "A lyrical classical dance form from Odisha that combines fluid body movements, graceful arm gestures, and sensuous curves into an enchanting celebration of love and devotion.",
    "hero": "/odissi-dancer-classical-pose.jpg",
    "native": {
      "lang": "Odia",
      "text": "ଓଡ଼ିଶୀ — ଓଡ଼ିଶାର ମନ୍ଦିରରୁ ଜନ୍ମିତ ନୃତ୍ୟ।",
      "gloss": "Odissi: a dance born in the temples of Odisha."
    },
    "history": [
      {
        "title": "Sacred Temple Tradition",
        "paras": [
          "Odissi originated in the 2nd century as a sacred temple dance in the Jagannatha Temple of Puri, Odisha. The \"Maharis\"—temple dancers—performed elaborate rituals and devotional dances.",
          "The dance form was designed to express the love and longing between Radha and Krishna, capturing the essence of bhakti—devotional surrender—through every movement."
        ],
        "image": "/odissi-jagannatha-temple.jpg"
      },
      {
        "title": "Modern Renaissance",
        "paras": [
          "After periods of decline, visionary artists like Kelucharan Mohapatra revived Odissi in the 20th century, standardizing techniques and bringing it to concert stages worldwide.",
          "Today, Odissi is celebrated globally as a major classical dance form, with both male and female dancers mastering its unique blend of spiritual depth and sensuous beauty."
        ],
        "image": "/odissi-classical-revival.jpg"
      }
    ],
    "philosophy": {
      "main": {
        "title": "The Poetry of Movement",
        "body": "Odissi is fundamentally lyrical—it flows like poetry in motion. The rounded, curved movements create an undulating rhythm that mirrors natural phenomena like waves, swaying trees, and the gentle motion of celestial bodies."
      },
      "coreTitle": "Core Philosophies",
      "core": [
        [
          "Rasanirman:",
          "Creation of emotional essence"
        ],
        [
          "Bhakti:",
          "Devotional love and surrender"
        ],
        [
          "Lyra:",
          "Lyrical, flowing expression"
        ]
      ],
      "third": {
        "title": "Sensuous Grace",
        "body": "Unlike angular forms, Odissi celebrates curves and softness. The tribhanga stance—with its three bends—creates a natural, organic beauty that expresses femininity and grace."
      }
    },
    "techIntro": "Odissi's technique combines lyrical grace with rhythmic precision. Key elements include the tribhanga posture, fluid hand movements, and expressive facial expressions that convey complex emotions.",
    "techniques": [
      {
        "name": "Tribhanga (Three Bends)",
        "description": "The signature Odissi posture with three bends in the body, creating fluidity and grace",
        "image": "/odissi-tribhanga-posture.jpg",
        "examples": [
          "Head bend",
          "Chest bend",
          "Hip bend"
        ]
      },
      {
        "name": "Chari (Footwork)",
        "description": "Rhythmic footwork patterns that ground the dancer and create the pulse of movement",
        "image": "/odissi-footwork-chari.jpg",
        "examples": [
          "Aramandi (horse stance)",
          "Walking patterns",
          "Rhythmic sequences"
        ]
      },
      {
        "name": "Hasta (Hand Gestures)",
        "description": "Graceful hand movements that complement the flowing body movements and express narratives",
        "image": "/odissi-hand-gestures.jpg",
        "examples": [
          "Single mudras",
          "Combined gestures",
          "Storytelling movements"
        ]
      },
      {
        "name": "Bhanga (Soft Curves)",
        "description": "Fluid, curved movements that define Odissi's lyrical and sensuous character",
        "image": "/odissi-fluid-movements.jpg",
        "examples": [
          "Wave-like motion",
          "Graceful transitions",
          "Feminine elegance"
        ]
      }
    ],
    "techNote": {
      "title": "The Language of Curves",
      "body": "In Odissi, straight lines are rare. Instead, dancers move in curves, waves, and arcs—creating a visual poetry that celebrates the beauty of organic forms and the sensuality of classical tradition."
    },
    "importance": [
      {
        "title": "Sacred Devotional Art",
        "body": "Odissi preserves thousands of years of temple worship, channeling divine love through the movements of Radha and Krishna, keeping alive spiritual traditions and sacred narratives."
      },
      {
        "title": "Feminine Empowerment",
        "body": "The revival of Odissi in the modern era gave women artists a platform for self-expression and cultural participation, making it a symbol of female empowerment and artistic independence."
      },
      {
        "title": "Aesthetic Innovation",
        "body": "Odissi's unique movement vocabulary has influenced contemporary dance, proving that classical traditions can remain relevant and inspiring for modern artists and audiences."
      },
      {
        "title": "Cultural Pride of Odisha",
        "body": "Odissi is intrinsically connected to Odisha's identity, representing the state's rich spiritual heritage, artistic sophistication, and contribution to India's classical traditions."
      }
    ],
    "closing": "Odissi is a celebration of beauty, grace, and devotion—where the soul speaks through the poetry of movement and the curves of classical elegance."
  }
}
