import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const postTexts = ['Post 1', 'Post 2', 'Post 3', 'Post 4'];
    const posts = postTexts.map((text, index) => ({
      id: String(index + 1),
      text,
    }));

    beforeEach(() => {
      postTexts.forEach((text) => postsService.create({ text }));
    });

    it('should return all posts if called without options', () => {
      // Act
      const result = postsService.findMany();

      // Assert
      expect(result).toEqual(posts);
    });

    it('should return correct posts for skip and limit options', () => {
      // Arrange
      const skip = 1;
      const limit = 2;
      const expectedResult = posts.slice(skip, skip + limit);

      // Act
      const result = postsService.findMany({ skip, limit });

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return correct posts when only skip is provided', () => {
      // Arrange
      const skip = 2;
      const expectedResult = posts.slice(skip);

      // Act
      const result = postsService.findMany({ skip });

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return correct posts when only limit is provided', () => {
      // Arrange
      const limit = 3;
      const expectedResult = posts.slice(0, limit);

      // Act
      const result = postsService.findMany({ limit });

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return all posts when skip is 0', () => {
      // Arrange
      const skip = 0;

      // Act
      const result = postsService.findMany({ skip });

      // Assert
      expect(result).toEqual(posts);
    });

    it('should return empty array when limit is 0', () => {
      // Arrange
      const limit = 0;

      // Act
      const result = postsService.findMany({ limit });

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when skip is greater than the number of posts', () => {
      // Arrange
      const skip = posts.length + 1;

      // Act
      const result = postsService.findMany({ skip });

      // Assert
      expect(result).toEqual([]);
    });

    it('should return all posts when limit is greater than the number of posts', () => {
      // Arrange
      const limit = posts.length + 1;

      // Act
      const result = postsService.findMany({ limit });

      // Assert
      expect(result).toEqual(posts);
    });
  });
});
