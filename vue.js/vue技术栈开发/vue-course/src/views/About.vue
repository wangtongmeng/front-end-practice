<template>
  <div class="about">
    <h1>This is an about page</h1>
		<p>{{ food }}</p>
  </div>
</template>
<script>
export default {
	props: {
		food: {
			type: String,
			default: 'apple'
		}
	}
}
</script>

