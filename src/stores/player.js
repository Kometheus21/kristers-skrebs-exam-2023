import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        playlist   : [],
        now_playing: {}, // SONG OBJECT
    }),
    getters: {
        getNextSong(){
            const index = this.playlist.findIndex(song => song.id == this.now_playing.id);
            return this.playlist[index + 1]
        },
        getPreviousSong() {
            const index = this.playlist.findIndex(song => song.id == this.now_playing.id);
            return this.playlist[index - 1];
        },
        getNowPlayingSongId() {
            return this.now_playing?.id;
        },
        getNowPlaying() {  
            return this.now_playing;
        },
        getNowPlayingAlbumID() {
            return this.now_playing?.album?.id ?? null;
        },
        getNowPlayingSongName() {
            return this.now_playing?.name ?? '';
        },
        getNowPlayingSongImage() {
            return this.now_playing?.album?.images[1].url ?? '';
        },
        getNowPlayingArtists() {
            return this.now_playing?.artists?.map(artist => artist.name).join(', ');
        },
        getNowPlayingSongPreview() {
            return this.now_playing?.preview_url;
        }
    },
    actions: {
        setPlaylist(newPlaylist) {
            this.playlist = newPlaylist;
        },
        setNowPlaying(playingSong) {
            this.now_playing = playingSong;
        },
        resetNowPlaying() {
            this.now_playing = {};
        },
    }
})