// ============================================================
// config.js — the only file you need to edit
// ============================================================

const CONFIG = {

  // ----------------------------------------------------------
  // PROFILE
  // ----------------------------------------------------------
  profileName:   "danh",      // name shown on the card
  nameTooltip:   "Duy Anh",         // tooltip on hover over the name
  nameEffect:    "noise",         // "noise" = TV interference | "none" = plain text
  statusText:    "⛧ すいちゃんは～ 今日もかわいい～！！☄️✨", // text below the name (typewriter effect)
  tabTitle:      "@Duy Anh Profile",      // animated browser tab title
  entrySymbol:   "☄️",            // symbol shown on the entry screen

  // ----------------------------------------------------------
  // FILES — place them in assets/ with these exact names
  // ----------------------------------------------------------
  avatar:              "assets/avatar.jpg",
  backgroundVideo:     "assets/background.mp4",
  customCursor:        "assets/cursor.png",
  customCursorHotspot: "0 0",    // "0 0" = tip of the cursor (top-left corner)

  // ----------------------------------------------------------
  // AVATAR
  // ----------------------------------------------------------
  avatarSize:       "118px",
  // animated Discord-style decoration — leave "" to disable
  avatarDecoration: "https://discord-decoration.art/decorations/starlight_tiara.png",

  // ----------------------------------------------------------
  // BADGES / ROLES
  // Add, remove or reorder. "icon" = path inside assets/badges/
  // ----------------------------------------------------------
  badges: [
    { icon: "assets/badges/owner.png",    label: "Owner"    },
    { icon: "assets/badges/verified.png", label: "Verified" },
    //{ icon: "assets/badges/partner.png",  label: "Partner"  },
    //{ icon: "assets/badges/hate.gif",     label: "hate"     },
  ],
  badgeSize:                "22px",
  badgeContainerBackground: "rgba(172, 200, 255, 0.08)",
  badgeContainerBorder:     "2px solid rgba(172, 200, 255, 0.04)",

  // ----------------------------------------------------------
  // DISCORD (static — no API, edit manually)
  // ----------------------------------------------------------
  discordUsername: "danyh.224",
  discordStatus:   "Hoshiyomi☄️",
  discordAvatar:   "assets/discord-avatar.jpg",
  discordAvatarSize:   "74px",
  discordAvatarBorder: "2px solid rgb(147, 215, 255)",
  // status: "online" | "idle" | "dnd" | "offline"
  discordPresenceStatus: "idle",

  // ----------------------------------------------------------
  // SOCIAL LINKS
  // Add, remove or reorder. "icon" = path inside assets/icons/
  // ----------------------------------------------------------
  socialLinks: [
    { name: "Instagram", url: "https://instagram.com/danyh.224",         icon: "assets/icons/instagram.png" },
    { name: "Spotify",   url: "https://open.spotify.com/user/31c42pgpxnefsxsat7tskfxt544e?utm_source=generator", icon: "assets/icons/spotify.png"   },
    { name: "TikTok",    url: "https://www.tiktok.com/@danyh.224",           icon: "assets/icons/tiktok.png"    },
    { name: "OnlyFans",  url: "https://onlyfans.com/aryminh",          icon: "assets/icons/onlyfans.png"  },
    { name: "Github",  url: "https://github.com/danyh224",          icon: "assets/icons/github.png"  },
,
  ],
  iconSize:         "36px",
  iconBorderRadius: "8px",
  iconGlowColor:    "#0081eb",

  // ----------------------------------------------------------
  // CARD
  // ----------------------------------------------------------
  cardMaxWidth:        "44rem",
  cardBorderRadius:    "85px",
  cardBackground:      "rgba(200, 27, 27, 0.03)",
  cardBorder:          "none",
  cardRevealDelay:     300,        // ms between entry click and card appearance
  cardTiltIntensity:   15,         // tilt degrees on mouse move (0 = disabled)
  cardTiltPerspective: "1000px",   // 3D perspective (lower = more dramatic)

  // ----------------------------------------------------------
  // DISCORD BOX (presence box inside the card)
  // ----------------------------------------------------------
  discordBoxBackground: "rgba(172, 200, 255, 0.07)",
  discordBoxRadius:     "14px",
  discordBoxBorder:     "2px solid rgba(172, 200, 255, 0.05)",

  // ----------------------------------------------------------
  // COLORS / STYLE
  // ----------------------------------------------------------
  usernameGlow: "0 0 16.5px #acc8ff", // name glow ("none" to disable)

  // ----------------------------------------------------------
  // BACKGROUND PARTICLES
  // ----------------------------------------------------------
  particleColor:            "#1100ff",
  particleCount:            70,
  particleFallDuration:     10,    // seconds to cross the screen top to bottom
  particleSwayDuration:     3,     // seconds per horizontal sway cycle
  particleSwayAmount:       80,    // pixels of horizontal sway
  particleParallaxStrength: 0.08,  // mouse parallax strength (0 = disabled)

  // ----------------------------------------------------------
  // CURSOR TRAIL
  // ----------------------------------------------------------
  shootingStarColors:       ["#7affff", "#0026ff", "#0077ff"],
  shootingStarSize:         3,
  shootingStarMaxParticles: 4,     // particles spawned per mouse movement
  shootingStarFadeFrames:   30,    // frames until each particle fades out
  shootingStarGlow:         8,     // glow intensity around each sparkle

};