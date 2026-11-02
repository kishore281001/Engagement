/* Venue and travel configuration. No invented coordinates or partner tokens. */
window.INVITATION_CONFIG = {
  venue: {
    name: 'Srinivasa Raja Thirumana Mandapam',
    address: 'Srinivasa Raja Thirumana Mandapam, No. 2/218, Seenivasan Street, Nanmangalam, Opp. Kovilambakkam Bus Stop, Chennai 600129',
    mapsUrl: 'https://maps.app.goo.gl/cT8Sg9sUsTBXuwWZ7', // Host-supplied venue link.
    latitude: 12.9407148, // From the host-supplied Google Maps embed.
    longitude: 80.1783449 // From the host-supplied Google Maps embed.
  },
  travel: {
    uberClientId: '', // Optional registered Uber client identifier.
    olaPartnerToken: '', // Ola's documented affiliate identifier; required for supported Ola prefill.
    rapidoApprovedLink: '', // Optional provider-approved destination link. Leave blank if unavailable.
    redbusApprovedLink: '' // Optional provider-approved Chennai journey link. redBus does not route to a wedding hall.
  }
};
