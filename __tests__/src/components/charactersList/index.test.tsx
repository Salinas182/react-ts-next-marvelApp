import React from 'react';
import { render, screen } from '@testing-library/react';
import CharactersList from '@/components/charactersList';
import charactersResponse from '../../../../__mocks__/mockData/characters.json';
import { Character } from '@/entities/character';

jest.mock('@/hooks/useFavorites', () => () => ({
  favorites: [] as Character[],
  updateFavorites: jest.fn(),
}));
jest.mock('@/components/characterCard/index.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Character Card</div>),
}));

const mockCharacters: Character[] = charactersResponse.data.results;

describe('CharactersList', () => {
  it('should render CharacterCard components for each character', () => {
    render(<CharactersList characters={mockCharacters} />);

    expect(screen.getAllByText('Character Card')).toHaveLength(
      mockCharacters.length
    );
  });

  it('should display a message when no characters are available', () => {
    render(<CharactersList characters={[]} />);

    expect(screen.getByText('No characters available')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CharactersList characters={mockCharacters} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
