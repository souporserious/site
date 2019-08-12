/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useEffect, useState } from 'react'

import { XStack, YStack, Image, Heading, Text } from './ui-elements'

export function LastPlayed() {
  const [lastTrack, setLastTrack] = useState({})
  useEffect(() => {
    ;(async function() {
      const response = await fetch(
        'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=ftntravis&api_key=ae84f730280e5f3cf99835cd7c1ad77b&format=json'
      )
      const data = await response.json()
      const lastTrack = data.recenttracks.track[0]
      const attributes = lastTrack['@attr']
      setLastTrack({
        artist: lastTrack.artist['#text'],
        album: lastTrack.album['#text'],
        track: lastTrack.name,
        albumArtworkSource: lastTrack.image[2]['#text'],
        url: lastTrack.url,
        nowPlaying: attributes && attributes.nowplaying === 'true',
        set: true,
      })
    })()
  }, [])
  return (
    <YStack spacing={16} css={{ opacity: lastTrack.set ? 1 : 0 }}>
      <Heading level={4}>
        {lastTrack.nowPlaying ? 'Currently listening to' : 'Last listened to'}
      </Heading>
      <XStack
        as="a"
        href={lastTrack.url}
        alignment="center"
        spacing={16}
        css={{ textDecoration: 'none' }}
      >
        <Image
          source={lastTrack.albumArtworkSource}
          description={lastTrack.album}
          width={60}
          height={60}
        />
        <YStack spacing={4}>
          <Text size="sm" weight="bold" color="white">
            {lastTrack.track}
          </Text>
          <Text size="xs">{lastTrack.artist}</Text>
        </YStack>
      </XStack>
    </YStack>
  )
}
