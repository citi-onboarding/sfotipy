import { Playlist } from '../../common/playlist'

export class PlaylistService {
  playlists: Playlist[] = [];
  categories: string[] = [];

  playlistEA: Playlist[] = [];

  getEA(): Playlist[] {
    return this.playlistEA;
  }

  get(): Playlist[] {
    return this.playlists;
  }

  getById(playlistId: number): Playlist {
    return this.playlists.find(({ id }) => id == playlistId);
  }
  addNewCategory(playlistId: number, category: string): Playlist {
    const playlist = this.getById(playlistId);
    if (playlist.categories.length > 2) {
      return null;
    }
    playlist.categories.push(category);
    return playlist;
  }

  deleteCategory(playlistId: number, category: string): Playlist {
    const playlist = this.getById(playlistId);
    if (playlist.categories.includes(category)) {
      playlist.categories.splice(playlistId, 1);
    } else {
      return null;
    }
    return playlist;
  }

  getAllCategories(): string[] {
    return this.categories;
  }

}
