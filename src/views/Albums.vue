<template>
    <div id="album-view">
        <div class="wrapper-header">
            <h1>ALBUMS</h1>
            <div class="settings">
                <button id="btn-grid" :class="{ active: is_grid }" @click="is_grid = true">
                    <IconGrid />
                </button>
                <button id="btn-list" :class="{ active: !is_grid }" @click="is_grid = false">
                    <IconList />
                </button>
            </div>
        </div>
        <ul id="list-albums" :class="{ grid: is_grid }">
            <li class="album" v-for="album in albums" @click="selectAlbum(album.id)"
                :class="{ active: store.getNowPlayingAlbumID === album.id }">
                <img id="img-album" :src="album.images[0].url" />
                <div class="album-info">
                    <h4 class="txt-album-name">{{ album.name }}</h4>
                    <p class="txt-album-artists">{{ getAlbumArtists(album.artists) }}</p>
                    <div class="album-year">
                        <p id="txt-album-year">{{ getAlbumYear(album.release_date) }}</p>
                        <p id="txt-album-tracks">{{ album.tracks.length > 1 ? `${album.tracks.length} songs` : `${album.tracks.length} song` }}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import songsAPI from '../data/songs'
import IconGrid from '../components/icons/IconGrid.vue'
import IconList from '../components/icons/IconList.vue'
import { usePlayerStore } from '../stores/player';

export default {
    components: { IconGrid, IconList },
    data() {
        const store = usePlayerStore();
        return {
            store,
            is_grid: true,
            clicks: 0
        }
    },
    mounted() {
    },
    methods: {
        getAlbumArtists(artists) {
            return artists.map(artist => artist.name).join(', ');
        },
        getAlbumYear(date) {
            const _date = new Date(date);
            return _date.getFullYear();
        },
        selectAlbum(albumID) {
            this.clicks++;
            let timer;
            if (this.clicks === 1) {
                timer = setTimeout(() => {
                    this.clicks = 0;
                }, 500);
            } else {
                clearTimeout(timer);
                this.store.setPlaylist(this.albums[albumID].tracks);
                this.store.setNowPlaying(this.albums[albumID].tracks[0]);
                this.clicks = 0;
            }
        }
    },
    computed: {
        albums() {
            return songsAPI.reduce((accumulator, currentSong) => {
                accumulator[currentSong.album.id] = accumulator[currentSong.album.id] || {
                    ...currentSong.album,
                    tracks: []
                };
                accumulator[currentSong.album.id].tracks.push(currentSong);
                return accumulator;
            }, Object.create(null));
        }
    }
}
</script>