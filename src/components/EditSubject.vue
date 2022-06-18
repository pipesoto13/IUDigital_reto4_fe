<template>
    <div class="row">
        <div class="col-12">
            <div class="card border-dark">
                <div class="card-header text-light bg-dark"><h4>Crear Asignatura</h4></div>
                <div class="card-body">
                    <form @submit.prevent="update">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Nombre</label>
                                    <input type="text" class="form-control" v-model="name">
                                </div>
                                <div class="form-group">
                                    <label>Creditos</label>
                                    <input type="number" class="form-control" v-model="credits">
                                </div>
                                <div class="form-group">
                                    <label>Profesor</label>
                                    <input type="text" class="form-control" v-model="teacher">
                                </div>
                                <div class="form-group">
                                    <label>Prerequisito</label>
                                    <input type="text" class="form-control" v-model="subjectReq">
                                </div>
                                <div class="form-group">
                                    <label>Horas Autonomas</label>
                                    <input type="number" class="form-control" v-model="autHours">
                                </div>
                                <div class="form-group">
                                    <label>Horas Directas</label>
                                    <input type="number" class="form-control" v-model="dirHours">
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-dark">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'EditSubject',
  data () {
    return {
      name: '',
      credits: '',
      teacher: '',
      subjectReq: '',
      autHours: '',
      dirHours: ''
    }
  },
  mounted () {
    this.showSubject()
  },
  methods: {
    async update () {
      const payload = {
        name: this.name,
        credits: this.credits,
        teacher: this.teacher,
        subjectReq: this.subjectReq,
        autHours: this.autHours,
        dirHours: this.dirHours
      }
      await this.$http.put(`http://127.0.0.1:8000/api/subjects/${this.$route.params.id}`, payload).then(response => {
        this.$router.push({ name: 'show-subject' })
      }).catch(error => {
        console.log(error)
      })
      this.name = ''
      this.credits = ''
      this.teacher = ''
      this.subjectReq = ''
      this.autHours = ''
      this.dirHours = ''
    },
    async showSubject () {
      console.log(this.$route.params.id)
      await this.$http.get(`http://127.0.0.1:8000/api/subjects/${this.$route.params.id}`).then(response => {
        const {name, credits, teacher, subjectReq, autHours, dirHours} = response.data
        this.name = name
        this.credits = credits
        this.teacher = teacher
        this.subjectReq = subjectReq
        this.autHours = autHours
        this.dirHours = dirHours
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
