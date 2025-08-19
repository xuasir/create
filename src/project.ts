export interface CreateProjectOptions {
  projectPath: string
}

export async function createProject(options: CreateProjectOptions) {
  const { projectPath } = options
  console.log('createProject', projectPath)
}