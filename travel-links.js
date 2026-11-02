/* Pure URL builders. Native app behaviour remains controlled by each provider. */
(function(root){
 'use strict';
 const packages={ola:'com.olacabs.customer',rapido:'com.rapido.passenger',redbus:'in.redbus.android'};
 function hasPin(venue){return typeof venue.latitude==='number'&&Number.isFinite(venue.latitude)&&Math.abs(venue.latitude)<=90&&typeof venue.longitude==='number'&&Number.isFinite(venue.longitude)&&Math.abs(venue.longitude)<=180}
 function approvedHttps(value){try{return value&&new URL(value).protocol==='https:'?value:''}catch{return ''}}
 function maps(config){const v=config.venue;return approvedHttps(v.mapsUrl)||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(hasPin(v)?v.latitude+','+v.longitude:v.address)}
 function androidIntent(uri,packageName,fallback){const u=new URL(uri);return 'intent://'+u.host+u.pathname+u.search+'#Intent;scheme='+u.protocol.slice(0,-1)+';package='+packageName+';S.browser_fallback_url='+encodeURIComponent(fallback)+';end'}
 function provider(name,config,userAgent){const v=config.venue,t=config.travel||{},pin=hasPin(v),android=/Android/i.test(userAgent||''),mobile=/Android|iPhone|iPad|iPod/i.test(userAgent||'');let href,webUrl,nativeUrl,mode='address-copy';
  if(name==='uber'){
   const q=new URLSearchParams({action:'setPickup',pickup:'my_location','dropoff[nickname]':v.name,'dropoff[formatted_address]':v.address});
   if(pin){q.set('dropoff[latitude]',v.latitude);q.set('dropoff[longitude]',v.longitude);mode='destination-pin'}else mode='address-only';
   if(t.uberClientId)q.set('client_id',t.uberClientId);
   href='https://m.uber.com/ul/?'+q;webUrl='https://m.uber.com/';nativeUrl='uber://riderequest?'+q;
  }else if(name==='ola'){
   webUrl='https://book.olacabs.com/';
   const q=new URLSearchParams({landing_page:'bk',bk_act:'none'});
   if(pin){q.set('drop_lat',v.latitude);q.set('drop_lng',v.longitude);q.set('drop_address',v.address);mode='destination-requested';}if(t.olaPartnerToken){q.set('utm_source',t.olaPartnerToken);if(pin)mode='destination-pin';}
   nativeUrl='olacabs://app/launch?'+q;
   href=pin&&t.olaPartnerToken?'https://olawebcdn.com/assets/ola-universal-link.html?'+q:nativeUrl;
   if(pin){const w=new URLSearchParams({drop_lat:v.latitude,drop_lng:v.longitude,drop_name:v.address,dsw:'yes'});if(t.olaPartnerToken)w.set('utm_source',t.olaPartnerToken);webUrl='https://book.olacabs.com/?'+w}if(android&&mode!=='destination-pin')href=androidIntent(nativeUrl,packages.ola,webUrl);if(!mobile)href=webUrl;
  }else if(name==='rapido'){
   webUrl='https://www.rapido.bike/';const approved=approvedHttps(t.rapidoApprovedLink);nativeUrl=approved||webUrl;href=approved||(android?androidIntent(nativeUrl,packages.rapido,webUrl):webUrl);if(approved)mode='provider-link';
  }else if(name==='redbus'){
   webUrl='https://www.redbus.in/buses/chennai-bus-tickets';mode='city-guide';const approved=approvedHttps(t.redbusApprovedLink);nativeUrl=approved||webUrl;href=approved||(android?androidIntent(nativeUrl,packages.redbus,webUrl):webUrl);if(approved)mode='provider-link';
  }else throw new Error('Unknown travel provider: '+name);
  return {name,href,webUrl,nativeUrl,mode,hasPin:pin};
 }
 function calendar(config){const q=new URLSearchParams({action:'TEMPLATE',text:'P. Natarajan & E. Aarthi · Engagement',dates:'20261122T043000Z/20261122T043000Z',ctz:'Asia/Kolkata',location:config.venue.address,details:'With the blessings of our families, please join us on Sunday, 22 November 2026 at 10:00 AM IST.\nVenue: '+config.venue.name+'\n'+maps(config)+'\nCeremony end time is not specified.'});return 'https://calendar.google.com/calendar/render?'+q}
 root.InvitationTravel={hasPin,maps,provider,androidIntent,calendar};
})(typeof window!=='undefined'?window:globalThis);
