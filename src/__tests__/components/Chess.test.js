import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Chess from 'components/Chess';
import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import boardActionTypes from 'constants/boardActionTypes';
import store from 'store';

const props = {
  server: {
    host: '127.0.0.1',
    port: '8080'
  }
};

const ReduxDispatcher = (action) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action);
  }, [dispatch]);

  return { state }
};

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

describe("Chess", () => {
  it("is rendered", () => {
    const chess = mount(<Chess props={props} />);
  });
  it("the first chess board square is a black rook before flipping the chess board", () => {
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.board-row').at(0).find('.square').at(0).find('span').text();
    expect(store.getState().board.flip).toBe('w');
    expect(text).toEqual('♜');
  });
  it("the first chess board square is a white rook after flipping the chess board", () => {
    const action = { type: boardActionTypes.FLIP };
    const { result } = renderHook(() => ReduxDispatcher(action), { wrapper });
    const chess = mount(<Chess props={props} />);
    const text = chess.find('.board-row').at(0).find('.square').at(0).find('span').text();
    expect(result.current.state.board.flip).toBe('b');
    expect(text).toEqual('♖');
  });
});
