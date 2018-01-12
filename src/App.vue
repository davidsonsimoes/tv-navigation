<template>
  <div id="app">
    <div class="nav">
      <a v-for="item of menu" :key="item.id" :class="item.classItem" href="#">{{item.text}}</a>
    </div>
    
    <div class="nav">
      <ul class="rail">
        <li v-for="item of trilho1" :key="item.id" class="card"><a href="#">{{item.text}}</a></li>
      </ul>
    </div>
    <div class="nav">
      <ul class="rail">
        <li v-for="item of trilho2" :key="item.id" class="card"><a href="#">{{item.text}}</a></li>
      </ul>
    </div>

    <div class="nav">
      <ul class="rail">
        <li v-for="item of trilho3" :key="item.id" class="card"><a href="#">{{item.text}}</a></li>
      </ul>
    </div>

    <div class="nav">
      <ul class="rail">
        <li v-for="item of trilho4" :key="item.id" class="card"><a href="#">{{item.text}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'app',
  beforeMount () {
      this.navigationApp().init() 
  },
  computed: {
      menu() {
          return this.$store.state.menu_itens
      },
      trilho1() {
          return this.$store.state.trilho1
      },
      trilho2() {
          return this.$store.state.trilho2
      },
      trilho3() {
          return this.$store.state.trilho3
      },
      trilho4() {
          return this.$store.state.trilho4
      }
  },
  methods: {
    navigationApp () {
        let top = 38,
            right = 39,
            bottom = 40,
            left = 37,
            row = document.getElementsByClassName("nav"),
            rowQtd = row.length,
            item = 0,
            c = null,
            itemQtd = 0,
            indexItem = 0,
            g = null,
            r = null,
            f = function(top) {
                c = row[item], 
                itemQtd = c.getElementsByTagName("a").length, 
                checkLastItem(),
                void 0 !== top && focusItem()
            },
            focusItem = function() {
                g = c.getElementsByTagName("a"), 
                (r = g[indexItem]).focus()
            },
            checkLastItem = function() {
              if(indexItem >= itemQtd){
                indexItem = itemQtd -1
              }
            },
            listenerKeydown = function() {
                window.addEventListener("keydown", function(row) {
                    ! function(row) {
                        switch (row.keyCode) {
                            case top:
                                console.log(itemQtd);
                                0 === item ? console.log("0") : item--, f(!0);
                                break;
                            case right:
                                indexItem === itemQtd - 1 ? console.log(itemQtd - 1) : indexItem++, focusItem();
                                break;
                            case bottom:
                                row = document.getElementsByClassName("nav");
                                rowQtd = row.length;
                                item === rowQtd - 1 ? console.log(rowQtd - 1) : item++, f(!0);
                                break;
                            case left:
                                0 === indexItem ? console.log("0") : indexItem--, focusItem()
                        }
                    }(row)
                })
            };
        return {
            init: function() {
                listenerKeydown(), f(), focusItem()
            }
        }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background: #f5f5f5;
  margin: 0;
}
.nav {
  position: relative;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.btn {
  opacity: 0.6;
  outline: none;
}

.btn.circle {
    width: 50px;
    height: 50px;
    border: 2px solid #002dd6;
    border-radius: 50%;
    color: #002dd6;
    text-decoration: none;
    text-align: center;
    line-height: 50px;
    position: absolute;
    top: 10px;
    background-color: #e2e8ea;
    font-size: 13px;
}
.btn:hover,
.btn:focus,
.btn.active {
  opacity: 1;
  border-color: red;
  color: red
}
.btn.back {
  left: 10px;
}
.btn.menu {
  left: 80px;
}
.btn.search {
  right: 10px;
}
.btn.search2 {
  right: 80px;
}

/* rail */
.rail {
  margin: 20px 0 0;
  width: 100%;
  top: 200px;
  position: relative;
  overflow: hidden;
}
.rail li {
  float: left;
  margin: 0 0 0 10px;
}
.card {
  width: 70px;
  height: 90px;
}

.card a{
    opacity: 0.6;
    background: #e2e8ea;
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    box-sizing: border-box;
    border: 1px solid #002dd6;
    -webkit-box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.36);
    -moz-box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.36);
    box-shadow: 9px 0 6px -9px rgba(0,0,0,0.30);
    text-decoration: none;
    font-size: 25px;
    line-height: 90px;
}
.card a:hover,
.card a:focus,
.card a.active {
  opacity: 1;
  border-color: red;
  color: red
}
</style>
