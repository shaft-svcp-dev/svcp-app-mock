<script setup lang="ts">
import {
  conversionPipelineNote,
  conversionPipelineTitle,
  conversionProgressLabel,
  conversionStepLabel,
} from '~/constants/upload'
import {
  conversionProgressPercent,
  conversionSteps,
} from '~/mocks/upload'
</script>

<template>
  <section class="conversion-pipeline" aria-labelledby="conversion-pipeline-heading">
    <h2 id="conversion-pipeline-heading" class="section-title">
      {{ conversionPipelineTitle }}
    </h2>
    <div class="stepper-track">
      <div class="stepper-nodes">
        <template
          v-for="(step, index) in conversionSteps"
          :key="step.id"
        >
          <div class="step">
            <div
              class="step-circle"
              :class="`step-circle-${step.status}`"
            >
              <AppIcon
                v-if="step.status === 'complete'"
                name="check-circle"
                :size="18"
              />
              <AppIcon
                v-else-if="step.status === 'active'"
                name="loader"
                :size="18"
              />
              <span v-else class="step-number">{{ index + 1 }}</span>
            </div>
            <span
              class="step-label"
              :class="{ 'step-label-active': step.status === 'active' }"
            >
              {{ conversionStepLabel[step.id] }}
            </span>
          </div>
          <div
            v-if="index < conversionSteps.length - 1"
            class="connector"
            :class="{ 'connector-complete': step.status === 'complete' }"
          />
        </template>
      </div>
    </div>
    <div class="progress-bar-section">
      <div class="progress-labels">
        <span class="progress-left">{{ conversionProgressLabel }}</span>
        <span class="progress-right">{{ conversionProgressPercent }}%</span>
      </div>
      <div class="bar-track">
        <div
          class="bar-fill"
          :style="{ width: `${conversionProgressPercent}%` }"
        />
      </div>
      <p class="pipeline-note">
        {{ conversionPipelineNote }}
      </p>
    </div>
  </section>
</template>
