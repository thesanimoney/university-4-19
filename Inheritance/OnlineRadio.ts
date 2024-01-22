/**
 * Custom exception class for invalid songs.
 */
class InvalidSongException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidSongException';
    }
}

/**
 * Exception for invalid artist names in songs.
 */
class InvalidArtistNameException extends InvalidSongException {
    constructor() {
        super('Artist name should be between 3 and 20 symbols.');
        this.name = 'InvalidArtistNameException';
    }
}

/**
 * Exception for invalid song names in songs.
 */
class InvalidSongNameException extends InvalidSongException {
    constructor() {
        super('Song name should be between 3 and 30 symbols.');
        this.name = 'InvalidSongNameException';
    }
}

/**
 * Exception for invalid song length in songs.
 */
class InvalidSongLengthException extends InvalidSongException {
    constructor() {
        super('Invalid song length.');
        this.name = 'InvalidSongLengthException';
    }
}

/**
 * Exception for invalid minutes in song length.
 */
class InvalidSongMinutesException extends InvalidSongLengthException {
    constructor(message: string = 'Song minutes should be between 0 and 14.') {
        // @ts-ignore
        super(message);
        this.name = 'InvalidSongMinutesException';
    }
}

/**
 * Exception for invalid seconds in song length.
 */
class InvalidSongSecondsException extends InvalidSongLengthException {
    constructor(message: string = 'Song seconds should be between 0 and 59.') {
        // @ts-ignore
        super(message);
        this.name = 'InvalidSongSecondsException';
    }
}


/**
 * Class representing a song with an artist name, song name, and duration.
 */
class Song {
    private artistName: string;
    private songName: string;
    private minutes: number;
    private seconds: number;

    /**
     * Creates a new Song instance.
     * @param artistName - The name of the artist.
     * @param songName - The name of the song.
     * @param duration - The duration of the song in the format 'minutes:seconds'.
     */
    constructor(artistName: string, songName: string, duration: string) {
        this.setArtistName(artistName);
        this.setSongName(songName);
        this.setDuration(duration);
    }

    /**
     * Validates and sets the artist name.
     * param name - The artist name to be set.
     * throws InvalidArtistNameException if the artist name is invalid.
     */
    private setArtistName(name: string): void {
        if (name.length < 3 || name.length > 20) {
            throw new InvalidArtistNameException();
        }
        this.artistName = name;
    }

    /**
     * Validates and sets the song name.
     * @param name - The song name to be set.
     * @throws InvalidSongNameException if the song name is invalid.
     */
    private setSongName(name: string): void {
        if (name.length < 3 || name.length > 30) {
            throw new InvalidSongNameException();
        }
        this.songName = name;
    }

    /**
     * Validates and sets the duration of the song.
     * @param duration - The duration of the song in the format 'minutes:seconds'.
     * @throws InvalidSongLengthException if the song duration is invalid.
     */
    private setDuration(duration: string): void {
        const [minutesStr, secondsStr] = duration.split(':');
        const minutes = parseInt(minutesStr);
        const seconds = parseInt(secondsStr);

        if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || minutes > 14 || seconds < 0 || seconds > 59) {
            throw new InvalidSongLengthException();
        }

        this.minutes = minutes;
        this.seconds = seconds;
    }

    /**
     * Returns a string representation of the song.
     * @returns A string representing the song.
     */
    toString(): string {
        return `${this.artistName} - ${this.songName} [${this.minutes}:${this.seconds}]`;
    }

    /**
     * Gets the total duration of the song in seconds.
     * @returns The total duration of the song in seconds.
     */
    getDurationInSeconds(): number {
        return this.minutes * 60 + this.seconds;
    }
}

/**
 * Class representing a playlist that stores songs.
 */
class Playlist {
    private songs: Song[] = [];

    /**
     * Adds a song to the playlist.
     * @param song - The song to be added.
     */
    addSong(song: Song): void {
        this.songs.push(song);
        console.log('Song added.');
    }

    /**
     * Gets the total length of the playlist in seconds.
     * @returns The total length of the playlist in seconds.
     */
    getTotalLength(): number {
        return this.songs.reduce((total, song) => total + song.getDurationInSeconds(), 0);
    }

    /**
     * Prints the total number of songs added and the total length of the playlist.
     */
    printPlaylistLength(): void {
        const totalSeconds = this.getTotalLength();
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        console.log(`Songs added: ${this.songs.length}`);
        console.log(`Playlist length: ${hours}h ${minutes}m ${seconds}s`);
    }
}

// Test cases
const playlist = new Playlist();
try {
    const input = ['ABBA;Mamma Mia;3:35', 'Nasko Mentata;Shopskata salata;4:123', 'Nasko Mentata;Shopskata salata;4:12'];

    for (const songInput of input) {
        const [artistName, songName, duration] = songInput.split(';');
        const song = new Song(artistName, songName, duration);
        playlist.addSong(song);
    }

    playlist.printPlaylistLength();
} catch (error) {
    console.log(error.message);
    playlist.printPlaylistLength();
}
