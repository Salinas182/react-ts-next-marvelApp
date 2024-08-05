import { AxiosResponse } from 'axios';
import getInitialCharacters from '@/api/getInitialCharacters';
import httpAdapter from '@/adapters/httpAdapter';
import { md5Hash } from '@/utils';
import charactersResponse from '../../../__mocks__/mockData/characters.json';

jest.mock('@/adapters/httpAdapter');
jest.mock('@/utils', () => ({
  md5Hash: jest.fn(),
}));

const { results: mockCharacters, count: mockCount } = charactersResponse.data;

describe('getInitialCharacters', () => {
  beforeEach(() => {
    process.env.MARVEL_PRIVATE_KEY = 'mock_private_key';
    process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY = 'mock_public_key';
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('gets the 20 first characters from the Marvel API', async () => {
    const mockHash = 'mockHash';
    (httpAdapter.get as jest.Mock).mockResolvedValue({
      data: charactersResponse,
    } as AxiosResponse);
    (md5Hash as jest.Mock).mockReturnValue(mockHash);

    const result = await getInitialCharacters();

    expect(httpAdapter.get).toHaveBeenCalledWith('/v1/public/characters', {
      limit: 20,
      ts: expect.any(String),
      hash: mockHash,
    });
    expect(result).toStrictEqual({
      characters: mockCharacters,
      count: mockCount,
    });
  });

  it('should handle errors and return empty data on failure', async () => {
    const mockHash = 'mockHash';
    (httpAdapter.get as jest.Mock).mockRejectedValue(new Error('Mock Error'));
    (md5Hash as jest.Mock).mockReturnValue(mockHash);

    const result = await getInitialCharacters();

    expect(httpAdapter.get).toHaveBeenCalledWith('/v1/public/characters', {
      limit: 20,
      ts: expect.any(String),
      hash: mockHash,
    });
    expect(result).toStrictEqual({
      characters: [],
      count: 0,
    });
  });
});
