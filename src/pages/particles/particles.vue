<template>
    <div id="vparticles" style="height:100%">
        <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            style="height: 100%"
        >
        </vue-particles>
    </div>
</template>

<style lang="stylus">
#vparticles
    width 100%
    height  100%
    background #000
</style>
