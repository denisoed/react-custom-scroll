!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","react-dom"],e):"object"==typeof exports?exports.ReactCustomScroll=e(require("react"),require("react-dom")):t.ReactCustomScroll=e(t.react,t["react-dom"])}(this,function(t,e){return function(t){function e(r){if(o[r])return o[r].exports;var s=o[r]={exports:{},id:r,loaded:!1};return t[r].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(1)},function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function s(t,e,o){return e=e||0===e?e:t,o=o||0===o?o:t,e>o?(console.error("min limit is greater than max limit"),t):t<e?e:t>o?o:t}function l(t,e){var o=e.getBoundingClientRect();return t.clientX>o.left&&t.clientX<o.left+o.width&&t.clientY>o.top&&t.clientY<o.top+o.height}function i(t){var e=this.props.minScrollHandleHeight;if(t.height>=e)return t;var o=e-t.height,r=this.state.scrollPos/(this.contentHeight-this.visibleHeight),s=o*r,l=t.top-s;return{height:e,top:l}}var n=o(2),a=o(3);t.exports=n.createClass({displayName:"customScroll",propTypes:{children:n.PropTypes.any,allowOuterScroll:n.PropTypes.bool,heightRelativeToParent:n.PropTypes.string,onScroll:n.PropTypes.func,addScrolledClass:n.PropTypes.bool,freezePosition:n.PropTypes.bool,handleClass:n.PropTypes.string,minScrollHandleHeight:n.PropTypes.number,flex:n.PropTypes.string,rtl:n.PropTypes.bool,scrollTo:n.PropTypes.number,keepAtBottom:n.PropTypes.bool},getDefaultProps:function(){return{handleClass:"inner-handle",minScrollHandleHeight:38}},getInitialState:function(){return this.scrollbarYWidth=0,{scrollPos:0,onDrag:!1}},componentDidMount:function(){this.forceUpdate()},componentDidUpdate:function(t,e){var o=this.contentHeight,r=this.visibleHeight,s=a.findDOMNode(this),l=s.getBoundingClientRect(),i=this.getScrolledElement(),n=e.scrollPos>=o-r;this.contentHeight=i.scrollHeight,this.scrollbarYWidth=i.offsetWidth-i.clientWidth,this.visibleHeight=i.clientHeight,this.scrollRatio=this.contentHeight?this.visibleHeight/this.contentHeight:1;var c=this.state.scrollPos>=this.contentHeight-this.visibleHeight,h=o!==this.contentHeight;this.toggleScrollIfNeeded(),this.position={top:l.top+window.pageYOffset,left:l.left+window.pageXOffset},(this.props.freezePosition||t.freezePosition)&&this.adjustFreezePosition(t),"undefined"!=typeof this.props.scrollTo&&this.props.scrollTo!==t.scrollTo?this.updateScrollPosition(this.props.scrollTo):this.props.keepAtBottom&&h&&n&&!c&&this.updateScrollPosition(this.contentHeight-this.visibleHeight)},componentWillUnmount:function(){document.removeEventListener("mousemove",this.onHandleDrag),document.removeEventListener("mouseup",this.onHandleDragEnd)},adjustFreezePosition:function(t){var e=this.getScrolledElement(),o=this.refs.contentWrapper;this.props.freezePosition&&(o.scrollTop=this.state.scrollPos),t.freezePosition&&(e.scrollTop=this.state.scrollPos)},toggleScrollIfNeeded:function(){var t=this.contentHeight-this.visibleHeight>1;this.hasScroll!==t&&(this.hasScroll=t,this.forceUpdate())},getScrollTop:function(){return this.getScrolledElement().scrollTop},updateScrollPosition:function(t){var e=this.getScrolledElement();e.scrollTop=t,this.setState({scrollPos:t})},onClick:function(t){if(this.hasScroll&&this.isMouseEventOnCustomScrollbar(t)&&!this.isMouseEventOnScrollHandle(t)){var e=this.calculateNewScrollHandleTop(t),o=this.getScrollValueFromHandlePosition(e);this.updateScrollPosition(o)}},isMouseEventOnCustomScrollbar:function(t){var e=a.findDOMNode(this.refs.customScrollbar);return l(t,e)},isMouseEventOnScrollHandle:function(t){var e=a.findDOMNode(this.refs.scrollHandle);return l(t,e)},calculateNewScrollHandleTop:function(t){var e=t.pageY-this.position.top,o=this.getScrollHandleStyle().top,r=void 0,s=e>o+this.scrollHandleHeight;return r=s?o+Math.min(this.scrollHandleHeight,this.visibleHeight-this.scrollHandleHeight):o-Math.max(this.scrollHandleHeight,0)},getScrollValueFromHandlePosition:function(t){return t/this.scrollRatio},getScrollHandleStyle:function(){var t=this.state.scrollPos*this.scrollRatio;return this.scrollHandleHeight=this.visibleHeight*this.scrollRatio,{height:this.scrollHandleHeight,top:t}},adjustCustomScrollPosToContentPos:function(t){this.setState({scrollPos:t})},onScroll:function(t){this.props.freezePosition||(this.adjustCustomScrollPosToContentPos(t.currentTarget.scrollTop),this.props.onScroll&&this.props.onScroll(t))},getScrolledElement:function(){return this.refs.innerContainer},onMouseDown:function(t){this.hasScroll&&this.isMouseEventOnScrollHandle(t)&&(this.startDragHandlePos=this.getScrollHandleStyle().top,this.startDragMousePos=t.pageY,this.setState({onDrag:!0}),document.addEventListener("mousemove",this.onHandleDrag),document.addEventListener("mouseup",this.onHandleDragEnd))},onHandleDrag:function(t){t.preventDefault();var e=t.pageY-this.startDragMousePos,o=s(this.startDragHandlePos+e,0,this.visibleHeight-this.scrollHandleHeight),r=this.getScrollValueFromHandlePosition(o);this.updateScrollPosition(r)},onHandleDragEnd:function(t){this.setState({onDrag:!1}),t.preventDefault(),document.removeEventListener("mousemove",this.onHandleDrag),document.removeEventListener("mouseup",this.onHandleDragEnd)},blockOuterScroll:function(t){if(!this.props.allowOuterScroll){var e=t.currentTarget,o=t.currentTarget.scrollHeight,r=o-t.currentTarget.offsetHeight,s=t.deltaY%3?t.deltaY:10*t.deltaY;e.scrollTop+s<=0?(e.scrollTop=0,t.preventDefault()):e.scrollTop+s>=r&&(e.scrollTop=r,t.preventDefault()),t.stopPropagation()}},getInnerContainerClasses:function(){var t="inner-container";return this.state.scrollPos&&this.props.addScrolledClass&&(t+=" content-scrolled"),t},getScrollStyles:function(){var t,e,o=this.scrollbarYWidth||20,s=this.props.rtl?"marginLeft":"marginRight",l=(t={},r(t,s,-1*o),r(t,"height",this.props.heightRelativeToParent||this.props.flex?"100%":""),t),i=(e={},r(e,s,this.scrollbarYWidth?0:o),r(e,"height",this.props.heightRelativeToParent||this.props.flex?"100%":""),r(e,"overflowY",this.props.freezePosition?"hidden":"visible"),e);return{innerContainer:l,contentWrapper:i}},getOuterContainerStyle:function(){return{height:this.props.heightRelativeToParent||this.props.flex?"100%":""}},getRootStyles:function(){var t={};return this.props.heightRelativeToParent?t.height=this.props.heightRelativeToParent:this.props.flex&&(t.flex=this.props.flex),t},render:function(){var t=this.getScrollStyles(),e=this.getRootStyles(),o=i.call(this,this.getScrollHandleStyle());return n.createElement("div",{className:"custom-scroll "+(this.state.onDrag?"scroll-handle-dragged":""),style:e},n.createElement("div",{className:"outer-container",style:this.getOuterContainerStyle(),onMouseDown:this.onMouseDown,onClick:this.onClick},this.hasScroll?n.createElement("div",{ref:"customScrollbar",className:"custom-scrollbar"+(this.props.rtl?" custom-scrollbar-rtl":""),key:"scrollbar"},n.createElement("div",{ref:"scrollHandle",className:"custom-scroll-handle",style:o},n.createElement("div",{className:this.props.handleClass}))):null,n.createElement("div",{ref:"innerContainer",className:this.getInnerContainerClasses(),style:t.innerContainer,onScroll:this.onScroll,onWheel:this.blockOuterScroll},n.createElement("div",{className:"content-wrapper",ref:"contentWrapper",style:t.contentWrapper},this.props.children))))}})},function(e,o){e.exports=t},function(t,o){t.exports=e}])});