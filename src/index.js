import TagTextarea from './components/TagTextarea.vue'

TagTextarea.install = (app) => {
  app.component(TagTextarea.name || 'TagTextarea', TagTextarea)
}

export default TagTextarea

export { TagTextarea }
