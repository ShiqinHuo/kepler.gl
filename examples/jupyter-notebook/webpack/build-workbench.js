// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import webpack from 'webpack';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {GA_TRACKING_ID} from '../src/shared/constants/default-settings';

import webpackConfig from './build';

const dist = path.resolve(__dirname, '../dist-workbench');
const template = path.resolve(__dirname, '../template/workbench.ejs');

export default {
  ...webpackConfig,

  entry: {
    main: ['./src/client/javascripts/main-jupyter']
  },

  output: {
    path: dist
  },

  // override default config to disable source-map
  devtool: '',

  plugins: [
    new ExtractTextPlugin({filename: 'styles.css'}),
    // new webpack.optimize.UglifyJsPlugin({compressor: {comparisons: false, warnings: false}}),
    new HtmlWebpackPlugin({
      template,
      appMountId: 'app-content',
      filename: 'voyager.html',
      inlineSource: '.(js|css)$',
      excludeAssets: [/style-*.css/],
      // googleAnalytics: {
      //   trackingId: GA_TRACKING_ID,
      //   pageViewOnLoad: true
      // },
      links: [
        'https://d1a3f4spazzrp4.cloudfront.net/uber-icons/3.14.0/uber-icons.css',
        'https://d1a3f4spazzrp4.cloudfront.net/uber-fonts/4.0.0/superfine.css'
      ],
      title: 'Voyager'
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new HtmlWebpackInlineSourcePlugin()
  ]
};
