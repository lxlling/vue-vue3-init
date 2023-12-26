<template>
  <div class="select-project">
    <a-dropdown
      placement="bottomRight"
      :class="className"
    >
      <span>系统管理</span>
      <template #overlay>
        <a-menu class="ant-pro-drop-down menu">
          <a-menu-item @click="handleTriggerClick">
            切换项目
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-modal
      v-model:visible="modalVisible"
      :keyboard="false"
      :mask-closable="false"
      title="请选择所属项目"
      :footer="null"
      centered
      :width="600"
    >
      <div style="padding: 10px 0">
        <a-input-search
          v-model:value="keyword"
          placeholder="支持项目编码、简称、名称查询"
          style="width: 300px"
          @search="onSearch"
        />
      </div>
      <a-spin
        size="large"
        :spinning="loading"
        tip="查询中..."
        style="text-align: center; margin-top: 65px; height: 430px"
      />
      <div v-if="!loading">
        <div
          v-if="projects_info.length === 0"
          style="text-align: center; margin-top: 65px; height: 430px"
        >
          <img
            style="width: 150px"
            src="@/assets/no-data.png"
            alt="无数据"
          >
          <span style="font-size: 14px; color: #9e9e9e">无数据</span>
        </div>
        <a-row
          v-else
          :gutter="24"
          style="
                        margin-top: 15px;
                        max-height: 480px;
                        min-height: 480px;
                        overflow: auto;
                    "
        >
          <a-col
            v-for="(item, index) in projects_info"
            :key="index"
            :span="6"
          >
            <a-card
              :hoverable="true"
              class="project"
              :body-style="bodyStyle"
              @click="chooseProject(item.name, item.name_cn)"
            >
              <a-card-meta>
                <template #title>
                  <div class="box">
                    <div :style="scaleStyle[index]">
                      {{ item.name }}
                    </div>
                  </div>
                </template>
                <template #description>
                  <div class="meta-content">
                    {{ item.name_cn }}
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import storage from 'store';
import { myRoles, getProjects, getProjectsQ } from '@/api/cmdbUser';
export default {
    props: ['className'],
    data() {
        return {
            modalVisible: false,
            loading: false,
            keyword: '',
            projects_info: [],
            bodyStyle: {
                padding: '20px 10px',
            },
            scaleStyle: [],
        };
    },
    created() {
        this.currentProject();
    },
    methods: {
        handleTriggerClick() {
            this.currentProject();
            this.modalVisible = true;
        },
        onSearch() {
            this.loading = true;
            this.projects_info = [];
            this.scaleStyle = [];
            getProjectsQ(this.$store.getters.name, this.keyword).then((res) => {
                this.loading = false;
                for (let i = 0; i < res.data.length; i++) {
                    this.projects_info.push({
                        name: res.data[i].id,
                        name_cn: res.data[i].name,
                    });
                    const len = res.data[i].id.length;
                    if (len < 5) {
                        this.scaleStyle.push({
                            transform: 'scale(1)  translateX(-50%)',
                        });
                    } else {
                        this.scaleStyle.push({
                            transform:
                                'scale(' + 4.5 / len + ')  translateX(-50%)',
                        });
                    }
                }
            });
        },
        currentProject() {
            this.loading = true;
            getProjects(this.$store.getters.name).then((res) => {
                // console.log('getProjects: ', res)
                this.loading = false;

                this.projects_info = [];
                this.scaleStyle = [];

                for (let i = 0; i < res.data.length; i++) {
                    this.projects_info.push({
                        name: res.data[i].id,
                        name_cn: res.data[i].name,
                    });
                    const len = res.data[i].id.length;
                    if (len < 5) {
                        this.scaleStyle.push({
                            transform: 'scale(1)  translateX(-50%)',
                        });
                    } else {
                        this.scaleStyle.push({
                            transform:
                                'scale(' + 4.5 / len + ')  translateX(-50%)',
                        });
                    }
                }
            });
        },
        chooseProject(name, nameCN) {
            localStorage.setItem('current-project', name);
            localStorage.setItem('current-name', this.$store.getters.name);
            localStorage.setItem('current-project-cn', nameCN);
            this.modalVisible = false;
            window.open(`${window.location.origin}/console`, '_self');
        },
    },
};
</script>

<style lang="less" scoped>
.select-project {
    display: inline-block;
}
:deep(.ant-modal-centered .ant-modal) {
    text-align: center !important;
}
.ant-pro-drop-down {
    :deep(.action) {
        margin-right: 8px;
    }
    // :deep(.ant-dropdown-menu-item){
    //     min-width: 160px;
    // }
}
.box {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    background: #ccc;
    margin: 0 auto;
    vertical-align: middle;
}
.box div {
    color: #ffffff;
    position: absolute;
    left: 50%;
    -webkit-transform-origin: 0 center;
    transform-origin: 0 center;
}
.project {
    margin-bottom: 24px;
}
.project:hover .box {
    background: #1890ff;
}
.meta-content {
    width: 100%;
    height: 36px;
    overflow: auto;
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 10px;
}
</style>
