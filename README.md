## `ytChannelLive`

as of August 12th, 2020

apparently checking whether a youtube channel is live every minute is prohibitively expensive when using the API

so

https://www.youtube.com/channel/CHANNEL_ID

`window["ytInitialData"]`

`contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelFeaturedContentRenderer.items[0~N].videoRenderer.badges[0~N].metadataBadgeRenderer`

metadataBadgeRenderer is an `Object` with useful properties `style` and `label`

`style` should be `"BADGE_STYLE_TYPE_LIVE_NOW"`

`label` should be `"LIVE NOW"`

this is because:

`robots.txt`
```
User-agent: *
Disallow: /channel/*/community
Disallow: /comment
Disallow: /get_video
Disallow: /get_video_info
Disallow: /live_chat
Disallow: /login
Disallow: /results
Disallow: /signup
Disallow: /t/terms
Disallow: /timedtext_video
Disallow: /user/*/community
Disallow: /verify_age
Disallow: /watch_ajax
Disallow: /watch_fragments_ajax
Disallow: /watch_popup
Disallow: /watch_queue_ajax
```
`/channel/*` is "allowed"

im probably missing some cases so ill do a broader search for the live badge