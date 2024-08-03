import { renderHook, waitFor } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import charactersResponse from '../../../__mocks__/mockData/characters.json';
import singleCharacterResponse from '../../../__mocks__/mockData/character.json';
import useCharacters from '@/hooks/useCharacters';
import { Character } from '@/entities/character';
import httpAdapter from '@/adapters/httpAdapter';

jest.mock('@/adapters/httpAdapter');

const { results: mockCharacters, count: mockCount } = charactersResponse.data;
const initialData = {
  characters: mockCharacters as Character[],
  count: mockCount,
};

describe('useCharacters', () => {
  it('should return the initial data provided if there is no user input', () => {
    const mockInput = '';

    const { result } = renderHook(
      ({ mockInput, initialData }) =>
        useCharacters({ nameInput: mockInput, initialData }),
      {
        initialProps: {
          mockInput,
          initialData,
        },
      }
    );

    expect(result.current.count).toBe(mockCount);
    expect(result.current.characters).toBe(mockCharacters);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('when input is provided, should fetch and return characters whose name starts with that input, if there is any', async () => {
    const mockInput = 'Spider';
    const { results: charactersFound, count: charactersFoundCount } =
      singleCharacterResponse.data;

    (httpAdapter.get as jest.Mock).mockResolvedValue({
      data: singleCharacterResponse,
    } as AxiosResponse);

    const { result } = renderHook(
      ({ mockInput, initialData }) =>
        useCharacters({ nameInput: mockInput, initialData }),
      {
        initialProps: {
          mockInput,
          initialData,
        },
      }
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(httpAdapter.get).toHaveBeenCalledWith('/v1/public/characters', {
        nameStartsWith: mockInput,
      });
      expect(result.current.count).toBe(charactersFoundCount);
      expect(result.current.characters).toBe(charactersFound);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });
});
