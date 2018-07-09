<template>
  <div id="app" >
    <div class="nav header" v-for="item in data.slice(0, 1)" :key="item.id" v-bind:style="{ backgroundColor: item.channel.color }">
      <div class="filtro"><a href="#" v-on:click="getData(1);">GNT</a> <a href="#"  v-on:click="getData(2);">Multishow</a> <a href="#"  v-on:click="getData(3);">OFF</a> <a href="#"  v-on:click="getData(4);">VIVA</a> <a href="#"  v-on:click="getData(7);">GLOOB</a> <a href="#"  v-on:click="getData(11);">SporTV</a></div>
    </div>
    <div class="background" v-for="teste in data.slice(0, 1)" :key="teste.id" v-bind:style="{ 'background-image': 'url(' + teste.channel.live_thumb_url + ')' }">
    <div class="content">
    
    <br/><br/>
    <div class="nav">
      <div v-for="item in data.slice(0, 1)" :key="item.id" class="logo" v-bind:style="{ backgroundColor: item.channel.color }">
        <img v-bind:src="item.channel.default_logo_url" alt="" />
      </div>
      <ul class="rail">
        <li v-for="item in data.slice(0, 8)" :key="item.id" class="card">
          <a href="#" v-bind:style="{ color: item.channel.color }">
            <span>{{ item.title.name }}</span>
            <div class="sinopse">{{item.title.synopsis}}</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="nav">
      <ul class="rail">
        <li v-for="item in data.slice(8, 16)" :key="item.id" class="card">
          <a href="#" v-bind:style="{ color: item.channel.color }">
            <span>{{ item.title.name }}</span>
            <div class="sinopse">{{item.title.synopsis}}</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="nav">
      <ul class="rail">
        <li v-for="item in data.slice(16, 24)" :key="item.id" class="card">
          <a href="#" v-bind:style="{ color: item.channel.color }">
            <span>{{ item.title.name }}</span>
            <div class="sinopse">{{item.title.synopsis}}</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://iepsen.globo.com:4000/'
})

export default {
  name: 'app',
  beforeMount () {
      this.getData(1);
      this.navigationApp().init();
  },
  data() {
    return {
      data: []
    }
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
    getData (channelId) {
      client.query({
        query: gql`
          query TodoApp {
            slotsRange(channelId: ${channelId}, startDate: "2018-07-09", endDate: "2018-07-9") {
              title {
                name
                synopsis
              }
              channel {
                name
                color
                default_logo_url
                live_thumb_url
              }}
            }
        `,
      })
        .then(data => this.data = data.data.slotsRange)
        .catch(error => console.error(error));
    },
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
  overflow: hidden;
}
.background {
  min-height: 700px;
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
}
.background::after {
  content: '';
  display: block;
  width: 100%;
  min-height: 700px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #000000;
  opacity: 0.7;
}
.content {
  z-index: 1;
  position: relative;
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
.logo {
  width: 150px;
  text-align: center;
  margin-left: 14px;
  border-radius: 5px
}
.logo img {
  width: 100%;
  display: block
}
.filtro a {
  display: inline-block;
  margin: 10px;
  text-decoration: none;
  background-color: #e2e8ea;
  border: 1px solid #002dd6;
  padding: 5px 15px;
  color: #002dd6;
  opacity: 0.7;
  outline: none;
}
.filtro a:hover,
.filtro a:focus,
.filtro a.active  {
  border-color: #000;
  color: #000;
  opacity: 1;
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
  border-color: #000;
  color: #000000
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
h2 {
  text-align: left;
  padding-left: 20px
}
/* rail */
.rail {
  margin: 20px 0 0;
  width: 100%;
  padding-top: 0;
  position: relative;
  /* overflow: hidden; */
}
.header {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 60px;
}
.header a {
  background: transparent;
  border: none;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 2px solid transparent
}
.header a:focus,
.header a:active {
opacity: 1;
color: #ffffff;
border-bottom: 2px solid #ffffff
}
.sinopse {
  position: absolute;
  width: 300px;
  background-color: #eaedee;
  z-index: 9;
  top: 130px;
  left: 50%;
  margin-left: -170px;
  font-size: 14px;
  line-height: 18px;
  padding: 20px;
  border: 1px solid #000000;
  display: none;
  opacity: 1;
}

.sinopse:after, .sinopse:before {
	bottom: 99.9%;
	left: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.sinopse:after {
	border-color: rgba(234, 237, 238, 0);
	border-bottom-color: #eaedee;
	border-width: 20px;
	margin-left: -20px;
}
.sinopse:before {
	border-color: rgba(255, 0, 0, 0);
	border-bottom-color: #000000;
	border-width: 21px;
	margin-left: -21px;
}

.rail li {
  float: left;
  margin: 0 0 10px 10px;
}
.card {
  width: 150px;
  height: 120px;

}

.card a{
    opacity: 0.8;
    background: #e2e8ea;
    border: 2px solid transparent;
    border-radius: 3px;
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
    line-height: 120px;
    vertical-align: middle;
    position: relative
}
.card a span {
  line-height: 16px;
  vertical-align: middle;
  font-size: 16px;
  display: inline-block;
  padding: 0 15px
}
.card a:hover,
.card a:focus,
.card a.active {
  opacity: 1;
  border-color: #000000;
  color: #000000
}
.card a:hover .sinopse ,
.card a:focus .sinopse ,
.card a.active .sinopse {
  display: block
}
</style>
