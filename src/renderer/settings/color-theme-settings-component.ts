import Vue from "vue";
import { Settings } from "./settings";
import { vueEventDispatcher } from "../vue-event-dispatcher";
import { VueEventChannels } from "../vue-event-channels";
import { UserConfigOptions } from "../../common/config/user-config-options";
import { defaultColorThemeOptions } from "../../common/config/default-color-theme-options";
import { cloneDeep } from "lodash";

export const colorThemeSettingsComponent = Vue.extend({
    data() {
        return {
            settingName: Settings.ColorTheme,
            visible: false,
        };
    },
    methods: {
        resetAll() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions = cloneDeep(defaultColorThemeOptions);
            this.updateConfig();
        },
        resetUserInputBackgroundColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.userInputBackgroundColor = defaultColorThemeOptions.userInputBackgroundColor;
            this.updateConfig();
        },
        resetUserInputTextColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.userInputTextColor = defaultColorThemeOptions.userInputTextColor;
            this.updateConfig();
        },
        resetSearchResultsBackgroundColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.searchResultsBackgroundColor = defaultColorThemeOptions.searchResultsBackgroundColor;
            this.updateConfig();
        },
        resetSearchResultsItemActiveBackgroundColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.searchResultsItemActiveBackgroundColor = defaultColorThemeOptions.searchResultsItemActiveBackgroundColor;
            this.updateConfig();
        },
        resetSearchResultsItemActiveTextColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.searchResultsItemActiveTextColor = defaultColorThemeOptions.searchResultsItemActiveTextColor;
            this.updateConfig();
        },
        resetSearchResultsItemNameTextColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.searchResultsItemNameTextcolor = defaultColorThemeOptions.searchResultsItemNameTextcolor;
            this.updateConfig();
        },
        resetSearchResultsItemDescriptionTextColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.searchResultsItemDescriptionTextColor = defaultColorThemeOptions.searchResultsItemDescriptionTextColor;
            this.updateConfig();
        },
        resetScrollbarForegroundColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.scrollbarForegroundColor = defaultColorThemeOptions.scrollbarForegroundColor;
            this.updateConfig();
        },
        resetScrollbarBackgroundColor() {
            const config: UserConfigOptions = this.config;
            config.colorThemeOptions.scrollbarBackgroundColor = defaultColorThemeOptions.scrollbarBackgroundColor;
            this.updateConfig();
        },
        updateConfig() {
            vueEventDispatcher.$emit(VueEventChannels.configUpdated, this.config);
        },
        getPreviewColor(color: string): string {
            return `background-color: ${color};`;
        },
        editColor(pickerId: string, color: string) {
            vueEventDispatcher.$emit(VueEventChannels.editColor, pickerId, color);
        },
        updateColor(pickerId: string, color: string) {
            Object.keys(this.config.colorThemeOptions).forEach((key) => {
                if (key === pickerId) {
                    this.config.colorThemeOptions[key] = color;
                }
            });
            this.updateConfig();
        },
    },
    mounted() {
        vueEventDispatcher.$on(VueEventChannels.showSetting, (settingName: string) => {
            if (this.settingName === settingName) {
                this.visible = true;
            } else {
                this.visible = false;
            }
        });

        vueEventDispatcher.$on(VueEventChannels.saveColor, (pickerId: string, color: string) => {
            this.updateColor(pickerId, color);
        });
    },
    props: ["config", "translations"],
    template: `
    <div v-if="visible">
        <div class="settings__setting-title title is-3">
            <span>
                {{ translations.colorThemeSettings }}
            </span>
            <button class="button" @click="resetAll">
                <span class="icon"><i class="fas fa-undo-alt"></i></span>
            </button>
        </div>
        <div class="settings__setting-content">

            <div class="settings__setting-content-item box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorthemeUserInputBackgroundColor }}
                    </div>
                    <button class="button" @click="resetUserInputBackgroundColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.userInputBackgroundColor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.userInputBackgroundColor"
                                @click="editColor('userInputBackgroundColor', config.colorThemeOptions.userInputBackgroundColor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings__setting-content-item box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorThemeUserInputTextColor }}
                    </div>
                    <button class="button" @click="resetUserInputTextColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.userInputTextColor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.userInputTextColor"
                                @click="editColor('userInputTextColor', config.colorThemeOptions.userInputTextColor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings__setting-content-item box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorThemeSearchResultsBackgroundColor }}
                    </div>
                    <button class="button" @click="resetSearchResultsBackgroundColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.searchResultsBackgroundColor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.searchResultsBackgroundColor"
                                @click="editColor('searchResultsBackgroundColor', config.colorThemeOptions.searchResultsBackgroundColor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings__setting-content-item box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorThemeSearchResultsItemActiveBackgroundColor }}
                    </div>
                    <button class="button" @click="resetSearchResultsItemActiveBackgroundColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.searchResultsItemActiveBackgroundColor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.searchResultsItemActiveBackgroundColor"
                                @click="editColor('searchResultsItemActiveBackgroundColor', config.colorThemeOptions.searchResultsItemActiveBackgroundColor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings__setting-content-item box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorThemeSearchResultsItemActiveTextColor }}
                    </div>
                    <button class="button" @click="resetSearchResultsItemActiveTextColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.searchResultsItemActiveTextColor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.searchResultsItemActiveTextColor"
                                @click="editColor('searchResultsItemActiveTextColor', config.colorThemeOptions.searchResultsItemActiveTextColor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings__setting-content-item box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorThemeSearchResutlsItemNameTextColor }}
                    </div>
                    <button class="button" @click="resetSearchResultsItemNameTextColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.searchResultsItemNameTextcolor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.searchResultsItemNameTextcolor"
                                @click="editColor('searchResultsItemNameTextcolor', config.colorThemeOptions.searchResultsItemNameTextcolor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings__setting-content-item box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorThemeSearchResultsItemDescriptionTextColor }}
                    </div>
                    <button class="button" @click="resetSearchResultsItemDescriptionTextColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.searchResultsItemDescriptionTextColor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.searchResultsItemDescriptionTextColor"
                                @click="editColor('searchResultsItemDescriptionTextColor', config.colorThemeOptions.searchResultsItemDescriptionTextColor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings__setting-content-item box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorThemeScrollbarForegroundColor }}
                    </div>
                    <button class="button" @click="resetScrollbarForegroundColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.scrollbarForegroundColor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.scrollbarForegroundColor"
                                @click="editColor('scrollbarForegroundColor', config.colorThemeOptions.scrollbarForegroundColor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings__setting-content-item show-overflow box">
                <div class="settings__setting-content-item-title">
                    <div class="title is-5">
                        {{ translations.colorThemeScrollbarBackgroundColor }}
                    </div>
                    <button class="button" @click="resetScrollbarBackgroundColor">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
                <div class="columns">
                    <div class="column field has-addons">
                        <div class="control">
                            <button class="button is-static previw-button" :style="getPreviewColor(config.colorThemeOptions.scrollbarBackgroundColor)"></button>
                        </div>
                        <div class="control is-expanded">
                            <input
                                class="input"
                                type="text"
                                v-model="config.colorThemeOptions.scrollbarBackgroundColor"
                                @click="editColor('scrollbarBackgroundColor', config.colorThemeOptions.scrollbarBackgroundColor)"
                                >
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="updateConfig">
                                <span class="icon"><i class="fas fa-check"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <color-picker :translations="translations"></color-picker>

        </div>
    </div>
    `,
});
