<script setup lang="ts">
import {
  freeMemberLabel,
  membershipSectionTitle,
  paidMemberLabel,
} from '~/constants/settings'

defineProps<{
  paid: boolean
}>()
</script>

<template>
  <section
    class="membership-status"
    aria-labelledby="membership-status-heading"
  >
    <h2
      id="membership-status-heading"
      class="section-title"
    >
      {{ membershipSectionTitle }}
    </h2>
    <div
      class="badge"
      :class="paid ? 'badge-paid' : 'badge-free'"
    >
      <span class="badge-label">
        {{ paid ? paidMemberLabel : freeMemberLabel }}
      </span>
    </div>
  </section>
</template>
