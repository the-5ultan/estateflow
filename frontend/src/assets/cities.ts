// Editorial city photography, never property listing data. Credits: docs/MEDIA.md.
export const cities = [
  {
    name: "Karachi",
    label: "THE CITY OF POSSIBILITIES",
    image: "photo-1617373743747-3bb331fd4e8d",
  },
  {
    name: "Lahore",
    label: "HERITAGE MEETS HOME",
    image: "photo-1628755615663-d14c78ed24f0",
  },
  {
    name: "Islamabad",
    label: "A BREATH OF FRESH AIR",
    image: "photo-1470756544705-1848092fbe5f",
  },
  {
    name: "Rawalpindi",
    label: "CONNECTED TO WHAT MATTERS",
    image: "photo-1617129926580-44e96bf7d0dc",
  },
].map((city) => ({
  ...city,
  image: `https://images.unsplash.com/${city.image}?auto=format&fit=crop&w=640&q=75`,
}));
