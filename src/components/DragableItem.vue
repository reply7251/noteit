<script lang="ts">



export default defineComponent({
    data() {
        return {
            pos: {
                x: 0,
                y: 0
            },
            startPos: {
                x: 0,
                y: 0
            },
            tmpPos: {
                x: 0,
                y: 0
            },
            pressed: false,
        }
    },
    props: {
        enabled: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        this.pos.x = window.document.body.clientWidth / 2
        this.pos.y = window.document.body.clientHeight / 2;
    },
    computed: {
        getStyle(){
            return this.pressed ? {
                    zIndex: 100,
                    left: `${this.tmpPos.x}px`,
                    top: `${this.tmpPos.y}px`,
                } : {
                left: `${this.pos.x}px`,
                top: `${this.pos.y}px`,
            }
        }
    },
    methods: {
        mouseDown(e: MouseEvent) {
            if(e.targetComponent || !this.enabled) return;
            this.startPos.x = e.x;
            this.startPos.y = e.y;
            this.tmpPos = {x: this.pos.x, y: this.pos.y}
            this.pressed = true;
        },
        mouseUp(e: MouseEvent) {
            if(this.pressed) {
                this.pressed = false
                this.pos.x += e.x - this.startPos.x;
                this.pos.y += e.y - this.startPos.y
                this.limitPosition(this.pos)
                //this.x += e.x - this.startX;
                //this.y += e.y - this.startY;
            }
        },
        mouseMove(e: MouseEvent) {
            if(this.pressed) {
                this.tmpPos.x = e.x - this.startPos.x + this.pos.x;
                this.tmpPos.y = e.y - this.startPos.y + this.pos.y;
                this.limitPosition(this.tmpPos)
                e.stopPropagation();
                e.preventDefault();
                //console.log("mouse move")
            }
        },
        limitPosition(pos: {x: number, y: number}) {
            if(pos.x < 0) {
                pos.x = 0;
            } else if(pos.x > window.document.body.clientWidth - this.$el.width) {
                pos.x = window.document.body.clientWidth - this.$el.width
            }
            if(pos.y < 0) {
                pos.y = 0;
            } else if(pos.y > window.document.body.clientHeight - this.$el.height) {
                pos.y = window.document.body.clientHeight - this.$el.height
            }
        }
    }
})

</script>


<template>
    <div class="draggable" ref="el" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseUp" :style="getStyle">
        <slot></slot>
    </div>
</template>

<style scoped>
.draggable {
    display: block;
    position: absolute;
    transform:translate(-50%, -50%);
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
}
/* 
.draggable:hover {
    z-index: 100;
} */
</style>