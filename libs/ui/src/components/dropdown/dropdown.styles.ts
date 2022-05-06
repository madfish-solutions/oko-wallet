import { StyleSheet } from 'react-native';

export const DropdownStyles = StyleSheet.create({
  root: {
    position: 'relative'
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    backgroundColor: '#ff821b'
  },
  white: {
    color: '#fff'
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    display: 'flex',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#1b262c',
    borderRadius: 4,
    transition: 'all .15s ease-in-out',
    color: '#fff',
    opacity: 1
  },
  open: {
    display: 'flex'
  },
  close: {
    display: 'none'
  }
});
