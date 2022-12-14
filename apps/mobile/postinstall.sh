#!/bin/bash

deprecated_types_replace_string="} from 'react-native'\nimport { ViewPropTypes } from 'deprecated-react-native-prop-types'"

sed -i "" "s/  ViewPropTypes,//" node_modules/react-native-camera/src/RNCamera.js
sed -i "" "s/} from 'react-native';/$deprecated_types_replace_string/" node_modules/react-native-camera/src/RNCamera.js
