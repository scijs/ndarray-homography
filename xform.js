'use strict'

var warp = require('ndarray-warp')

module.exports = applyHomography

function applyHomography(dest, src, X) {
  var n = src.dimension
  warp(dest, src, function(out_c, inp_c) {
    for(var i=0; i<n; ++i) {
      out_c[i] = X[(n+2)*i]
      for(var j=0; j<n; ++j) {
        out_c[i] += X[(n+1)*i+j] * inp_c[j]
      }
    }
    var w = X[(n+1)*(n+1)-1]
    for(var j=0; j<n; ++j) {
      w += X[(n+1)*n+j] * inp_c[j]
    }
    var wr = 1.0 / w
    for(var i=0; i<n; ++i) {
      out_c[i] *= wr
    }
    return out_c
  })
  return dest
}