"use strict";
const https = require('https')
const path = require('path')
const UserAgent = require('user-agents')

let ytParseLive = data => {
	let lines = data.split('\n')
	let line = ''
	let featuredContent = null
	let featuredContentBadge = null
	let renderObject = null
	let liveNow = null

	for (line in lines) {
		if (line.includes('window["ytInitialData"] =') || 
		line.includes('window["ytInitialData"]=')) {
			let temp = line.replace('window["ytInitialData"] =', '')
			temp = line.replace('window["ytInitialData"]=', '')
			temp = temp.trim()
			renderObject = JSON.parse(temp)
			break;
		}
	}

	if (renderObject != null) {
		liveNow = false

		findLiveBadge:
		for (featuredContent in renderObject.contents.twoColumnBrowseResultsRenderer
			.tabs[0].tabRenderer.content.sectionListRenderer.contents[itemSectionRenderer]
			.contents[0].channelFeaturedContentRenderer.items) {
			for (featuredContentBadge in featuredContent.videoRenderer.badges) {
				let badgeRenderer = featuredContentBadge.metadataBadgeRenderer
				if (badgeRenderer.style.equals('BADGE_STYLE_TYPE_LIVE_NOW') ||
				badgeRenderer.label.equals('LIVE NOW')) {
					liveNow = true
					break findLiveBadge
				}
			}
		}
	}
	
	return liveNow;
}

module.exports = {
	ytChannelLive: (channelID, callback) => {
		let userAgent = new UserAgent()
		let options = {
			hostname: 'www.youtube.com',
			port: 443,
			path: path.join('/channel', channelID),
			method: 'GET',
			headers: { 'User-Agent':  userAgent.toString() }
		}

		let data = ''
		let req = https.request(options, res => {
			res.on('data', d => {
				data += d
			})

			res.on('end', () => {
				console.log(data)
				callback(false, ytParseLive(data))
			})
		})

		req.on('error', err => {
			callback(true, null)
		})

		req.end()
	}
}